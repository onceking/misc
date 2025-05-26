#! /usr/bin/env python3

import concurrent.futures
import os
import sys

def walk(d):
  subdirs = []
  n = 0
  with os.scandir(d) as it:
    for entry in it:
      if entry.is_dir():
        subdirs.append(entry.path)
      n += 1
  print("%3d  %s" %(n, d))
  return subdirs

def main():
  with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
    futures = {executor.submit(walk, x) for x in sys.argv[1:]}
    while futures:
      for f in concurrent.futures.as_completed(futures):
        futures.remove(f)
        for d in f.result():
          futures.add(executor.submit(walk, d))
        break

if __name__ == '__main__':
  main()