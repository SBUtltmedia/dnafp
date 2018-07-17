import json
with open('style.css') as x: f = x.readlines()
animations={}
for idx, val in enumerate(f):
    if val.startswith('.anim'):
   
        animations[val.split("{")[0].split('.')[1].strip()]=f[idx+1].split("animation:")[1].split(';')[0]
    
print json.dumps(animations)