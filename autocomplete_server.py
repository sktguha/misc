from http.server import BaseHTTPRequestHandler, HTTPServer
import time
from next_word_prediction import GPT2
# this is from this repo https://github.com/rdgozum/next-word-prediction
gpt2 = GPT2();

hostName = "localhost"
serverPort = 9000

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            self.send_response(200)
            self.send_header("Content-type", "text/plain")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
            self.end_headers()
            print("got path as: " + self.path)
            text_org = self.path.split("=").pop()
            print("got original text as: " + text_org)
            text = text_org.replace("%20"," ")
            print("got text as: " + text)
            predictions = gpt2.predict_next(text, 100)
            predictions_string = predictions.__str__()
            print("sending response: " + predictions_string)
            self.wfile.write(bytes(predictions_string, encoding='utf8'))
        except Exception as e:
            print("error occurred: " + str(e))

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
