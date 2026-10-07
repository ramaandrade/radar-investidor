import http.server
import socketserver
import webbrowser
import os

PORT = 8086
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Header de cache e segurança para simulação mobile
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print(f"==================================================")
        print(f"  PASSO 6: O RADAR DO INVESTIDOR (TEMA 4)")
        print(f"  Servidor local rodando em: {url}")
        print(f"  Pressione Ctrl+C para encerrar.")
        print(f"==================================================")
        httpd.serve_forever()
