import Image from "next/image";

export default function Home() {
  return (
    <div className="page-wrapper">
      <main>
        {/* Helper div for spacing since we don't have the header component yet */}
        <div style={{ height: '0px' }}></div>
        
        <section className="hero">
          <div className="container hero-content">
            <h1>Colombia University Africa Alumni</h1>
            <p className="hero-subtitle">
              Empowering African leaders through mentorship and community. <br/>
              Join 90+ Columbia University alumni building Africa's future.
            </p>
            <div className="hero-buttons">
              <a href="#" className="btn btn-primary">Join the Community</a>
              <a href="#" className="btn btn-secondary">Learn More</a>
            </div>
          </div>
          <div className="africa-bg"></div>
        </section>

        <section className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h2>Welcome to the New Era</h2>
          <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
            We are migrating to a modern tech stack to better serve our community.
            Stay tuned for the new interactive directory and members area.
          </p>
        </section>
      </main>
    </div>
  );
}
