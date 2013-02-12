import re
import subprocess
import json
import pytz
from datetime import datetime

import tornado.ioloop
import tornado.web

EST = pytz.timezone('US/Eastern')

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("templates/index.html")

class LoadHandler(tornado.web.RequestHandler):
    def get(self):
        load = re.search('\d\.\d\d',
                         subprocess.check_output('uptime')).group()
        self.write(json.dumps({'timestamp': datetime.now(EST).isoformat(),
                               'load': load}))

application = tornado.web.Application([
        (r"/", MainHandler),
        (r"/load.json", LoadHandler)
], debug=True)

if __name__ == "__main__":
    application.listen(5000)
    tornado.ioloop.IOLoop.instance().start()
