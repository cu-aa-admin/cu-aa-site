// netlify/functions/submit-blog-post.js
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Validate required fields
    const { title, category, content, author, authorEmail, authorSchool } = data;
    
    if (!title || !category || !content || !author || !authorEmail) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Create the blog post markdown content
    const date = new Date().toISOString().split('T')[0];
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const markdownContent = `---
layout: post
title: "${title}"
date: ${date}
author: "${author}"
categories: ${category}
tags: [${data.tags || ''}]
---

${content}

---
*This post was submitted by ${author} (${authorSchool}) through our [blog contribution form](/blog/).*
`;

    // Email configuration
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const emailHtml = `
      <h2>New Blog Post Submission</h2>
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Author:</strong> ${author} (${authorSchool})</p>
      <p><strong>Email:</strong> ${authorEmail}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      
      <h3>Suggested Filename:</h3>
      <code>${date}-${slug}.markdown</code>
      
      <h3>Content:</h3>
      <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; white-space: pre-wrap;">${markdownContent}</pre>
      
      <h3>Next Steps:</h3>
      <ol>
        <li>Review the content for quality and guidelines compliance</li>
        <li>Make any necessary edits</li>
        <li>Create the file in your Jekyll _posts directory</li>
        <li>Commit and push to publish</li>
        <li>Email the author to confirm publication</li>
      </ol>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@columbia-africa.org',
      subject: `New Blog Submission: ${title}`,
      html: emailHtml,
      attachments: [
        {
          filename: `${date}-${slug}.markdown`,
          content: markdownContent,
          contentType: 'text/markdown'
        }
      ]
    });

    // Send confirmation email to author
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: authorEmail,
      subject: 'Blog Submission Received - Columbia University Africa Alumni',
      html: `
        <h2>Thank you for your submission!</h2>
        <p>Dear ${author},</p>
        <p>We've received your blog post submission: "<strong>${title}</strong>"</p>
        <p>Our editorial team will review your post and get back to you within 5-7 business days.</p>
        <p>If approved, your post will be published on our blog at <a href="https://columbia-africa.org/blog/">columbia-africa.org/blog</a></p>
        <p>Best regards,<br>The CU-AA Editorial Team</p>
      `
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Submission received successfully',
        filename: `${date}-${slug}.markdown`
      })
    };

  } catch (error) {
    console.error('Error processing submission:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};