import time
import socket, select, queue
import threading

from flask import Flask
from celery import Celery

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}



def make_celery(app):
    celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    TaskBase = celery.Task
    class ContextTask(TaskBase):
        abstract = True
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)
    celery.Task = ContextTask
    return celery

app = Flask(__name__)
app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379',
    CELERY_RESULT_BACKEND='redis://localhost:6379'
)
celery = make_celery(app)
socket_queue = queue.Queue()



# @celery.task()
# def listen_to_udp():
#     """
#     This code was taken from 
#     https://stackoverflow.com/questions/9969259/python-raw-socket-listening-for-udp-packets-only-half-of-the-packets-received
#     """
#     s1 = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
#     s1.bind(('0.0.0.0', 1338))
#     s2 = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_UDP)
#     s2.bind(('0.0.0.0', 1338))
#     while True:
#         r, w, x = select.select([s1, s2], [], [])
#         for i in r:
#             socket_queue.put((i, i.recvfrom(1337)))

def receive_udp_messages():
    # Create a UDP socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    # Bind to the desired port
    sock.bind(('localhost', 8081))

    while True:
        # Receive a UDP message
        data, address = sock.recvfrom(1337)

        # Process the received message
        print(f"Received UDP message from {address}: {data}")

thread = threading.Thread(target=receive_udp_messages)
thread.start()

@app.route("/udp")
def handle_udp_request():
    # Check if there's a new UDP message
    if len(request.data) > 0:
        # Process the UDP message received from the Flask request
        print(f"Received UDP message from Flask request: {request.data}")

        return 'UDP message received from Flask request'
    else:
        return 'No new UDP messages received'

# @app.route("/")
# def test_home():
#     listen_to_udp.delay()
#     print(socket_queue.get())

if __name__ == "__main__":
    #run install.py to install dependencies and create the database
    app.run(host="0.0.0.0", port=5000, debug=True)