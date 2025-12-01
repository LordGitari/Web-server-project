#!/usr/bin/env python3
# simple server for carcrafters website
# just serves static files and stuff

import http.server
import socketserver
from pathlib import Path
import os

# config
PORT = 8000
BASE_DIR = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    # custom handler for our website
    
    def __init__(self, *args, **kwargs):
        # set base directory
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)
    
    def do_GET(self):
        # serve homepage
        if self.path in ('/', '/index.html'):
            self.path = '/templates/index.html'
        
        # check if file exists
        file_path = str(BASE_DIR) + self.path
        if not os.path.exists(file_path):
            # file not found, serve error page
            self.path = '/templates/error.html'
        
        # images folder
        if self.path.startswith('/images/'):
            return super().do_GET()
        
        # everything else
        return super().do_GET()
    
    def end_headers(self):
        # cors stuff
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()


def run_server():
    # start the server
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print("=" * 60)
        print("CarCrafters Server Started!")
        print("=" * 60)
        print(f"Server running at: http://localhost:{PORT}")
        print(f"Serving from: {BASE_DIR}")
        print("Press Ctrl+C to stop")
        print("=" * 60)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped")
            print("=" * 60)


if __name__ == "__main__":
    run_server()
