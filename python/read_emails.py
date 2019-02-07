import json
import os

# use the dirname in order to make the script working if we call it from anywhere
CONFIG_FILE = os.path.dirname(__file__) + '/../config.json'
I_MESSAGE_DIR = '/Users/Thibault/Library/Messages/Archive'

def get_config():
    with open(CONFIG_FILE) as file:
        config = json.load(file)
    return config


CONFIG = get_config()

def add_track_to_txt_file(string):
    # if the file is not empty we had the track on a new line
    if os.path.getsize(CONFIG['txt_path']) > 0:
        string = '\n' + string
    # append string to the file
    f = open(CONFIG['txt_path'], "a")
    f.write(string)


def test():
    files = os.listdir(I_MESSAGE_DIR)
    for name in files:
        i = os.listdir(name)
        for n in i:
            print n

test()
