#!/usr/bin/env bash
set -euo pipefail

# -----------------------------
# Config
# -----------------------------
VENV_DIR=".venv"
PYTHON_BIN="python3"
SCRIPT_NAME="build_ssa_china_dataset.py"

echo "===> Checking for Python..."
if ! command -v "${PYTHON_BIN}" >/dev/null 2>&1; then
  echo "ERROR: ${PYTHON_BIN} not found. Install Python 3 first."
  exit 1
fi

# -----------------------------
# Create / activate venv
# -----------------------------
if [ ! -d "${VENV_DIR}" ]; then
  echo "===> Creating virtual environment in ${VENV_DIR}..."
  "${PYTHON_BIN}" -m venv "${VENV_DIR}"
fi

echo "===> Activating virtual environment..."
# shellcheck disable=SC1090
source "${VENV_DIR}/bin/activate"

# -----------------------------
# Install dependencies
# -----------------------------
echo "===> Installing Python dependencies (pandas, requests)..."
pip install --upgrade pip >/dev/null
pip install pandas requests >/dev/null

# -----------------------------
# Run the app
# -----------------------------
if [ ! -f "${SCRIPT_NAME}" ]; then
  echo "ERROR: ${SCRIPT_NAME} not found in current directory."
  exit 1
fi

echo "===> Running ${SCRIPT_NAME}..."
${PYTHON_BIN} "${SCRIPT_NAME}"

echo "===> Done. Check the generated CSV file in this directory."
