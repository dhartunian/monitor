import re
import subprocess
import json
from datetime import datetime

from flask import Flask
from flask import render_template

app = Flask(__name__)
app.debug = True

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/load.json')
def load():
    load = re.search('\d\.\d\d',
                     subprocess.check_output('uptime')).group()
    return json.dumps({'timestamp': datetime.now().isoformat(),
                       'load': load})

if __name__ == '__main__':
    app.run()
