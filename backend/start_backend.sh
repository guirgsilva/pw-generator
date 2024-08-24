#!/bin/bash
source /home/ubuntu/pw-generator/backend/venv/bin/activate
exec gunicorn -b 0.0.0.0:5000 app:app
