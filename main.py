"""Run the portfolio locally with: python main.py"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from functools import partial
import webbrowser

PORT = 8000
ROOT_DIR = Path(__file__).resolve().parent

if __name__ == '__main__':
    handler = partial(SimpleHTTPRequestHandler, directory=str(ROOT_DIR))
    with ThreadingHTTPServer(('127.0.0.1', PORT), handler) as server:
        url = f'http://127.0.0.1:{PORT}/'
        print(f'Portfolio: {url}')
        webbrowser.open(url)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print('Servidor encerrado.')
