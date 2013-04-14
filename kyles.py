class ImageFrame:
    def __init__(self, pixels):
        self.img = PhotoImage(width = WIDTH, height = HEIGHT)
        for row in range(HEIGHT):
            for col in range(WIDTH):
                num = pixels[row*WIDTH+col]
                if COLORFLAG:
                    kolor = '#%02x%02x%02x' % (num[0], num[1], num[2])
                else:
                    kolor = '#%02x%02x%02x' % (num, num, num)
                self.img.put(kolor, (col, row))
        c = Canvas(root, width = WIDTH, height = HEIGHT); c.pack()
        c.create_image(0,0, image = self.img, anchor = NW)
        printElapsedTime('displayed image')
        
def confirmP3fileType(file1):
    stng = file1.readline().strip()
    if stng[0] + stng[1] != 'P3':
        print('ERROR: NOT P3!')
        file1.close()
        exit()
        
def printElapsedTime (msg = 'time'):
    length = 30
    msg = msg[:length]
    tab = '.'*(length-len(msg))
    print('--' + msg.upper() + tab + '', end = '')
    time = round(clock() - START, 1)
    print( '%2d'%int(time/60), ' min :', '%4.1f'%round(time%60, 1), ' sec', sep = '')

def readFileNumbersIntoString(file1):
    nums = file1.read().split()
    file1.close()
    if len(nums)%3 != 0:
        print('WARNING: Size of File(', len(nums) ,') % 3 != 0')
        exit()
    return nums
        
def convertStringRGSsToGrayIntegerOrColorTuples(nums):
    image = []
    for pos in range(0,len(nums),3):
        ints = int(nums[pos]), int(nums[pos+1]), int(nums[pos+2])
        image.append(int(0.2*ints[0]+0.7*ints[1]+0.1*ints[2]))
    return image

def printTitleAndSizeOfimageInPixels(image):
    print('RTI')
    if len(image) != WIDTH * HEIGHT:
        print('ERROR: Bad file size')
        print('Number of Pixels', len(image))
    printElapsedTime('image extracted from file')
    
def readPixelColorsFromFile(file1):
    confirmP3fileType(file1)
    nums = readFileNumbersIntoString(file1)
    image = convertStringRGSsToGrayIntegerOrColorTuples(nums)
    printTitleAndSizeOfimageInPixels(image)
    return image

def saveNumbersToFile(filename, image):
    pass

def smoothImageCellWithNeighbor(row, col, image):
    if not(row == 0 or col == 0 or row == HEIGHT-1 or col == WIDTH-1):
        xy = row*512+col
        image[xy]=\
                (image[xy-513]+ \
                2*image[xy-512]+ \
                image[xy-511]+ \
                2*image[xy-1]+ \
                4*image[xy]+ \
                2*image[xy+1]+ \
                image[xy+511]+ \
                2*image[xy+512]+ \
                image[xy+513])/16
        
def smoothTheImage(image, count):
    image2 = image[:]
    for i in range(count):
        for r in range(WIDTH):
            for c in range(HEIGHT):
                smoothImageCellWithNeighbor(r,c,image2)
    return image2
    
def frange(start, stop, step):
    i = start
    terminate = stop-(step/10)
    while i < terminate:
        yield i
        i+=step
        
def drawLine(m, b, image, start = 0, stop = 512):
    for i in range(b, stop):
        image[int( (i*512) + m*i+b )] = 255
        
def drawLine2(r, theta, image):
    from math import atan2, cos, tan
    m = tan(theta)
    phi = atan2(m,1)
    if phi < 0: phi += pi
    for i in range(int(r*cos(m))):
        index =int( (i*512) + m*i)
        if len(image)>index:
            image[index]=255
    

def imageNoise(points,image):
    for i in range(points):
        image[randint(0,HEIGHT*WIDTH-1)] = 255
        
def sobelTransformation(image):
    from math import sqrt
    image2 = [[0,0,0,0,0] for i in range(HEIGHT*WIDTH)]
    tmp = image[600]
    for row in range(HEIGHT):
        for col in range(WIDTH):
            index = row*512+col
            Gx = gradX(row,col,image)
            Gy = gradY(row,col,image)
            temp = [sqrt(Gx*Gx+Gy*Gy),theta(Gx,Gy),0,0,0]
            image2[index] = temp
    return image2

def getGyGx(image,i,a):
   return ( 1*image[(i-1)*512+(a-1)] +\
        2*image[(i-1)*512+(a+0)] +\
        1*image[(i-1)*512+(a+1)] +\
        -1*image[(i+1)*512+(a-1)] +\
        -2*image[(i+1)*512+(a+0)] +\
        -1*image[(i+1)*512+(a+1)] ,\

        1*image[(i-1)*512+(a-1)] +\
         2*image[(i-0)*512+(a-1)] +\
         1*image[(i+1)*512+(a-1)] +\
         -1*image[(i-1)*512+(a+1)] +\
         -2*image[(i+0)*512+(a+1)] +\
         -1*image[(i+1)*512+(a+1)] )

def sobelize(image):
   ret = [[0,0,0,0,0] for i in range(512*512) ]
   for i in range(1,WIDTH-1):
      for a in range(1,HEIGHT-1):
         gy,gx = getGyGx(image,i,a);
         tmp = [sqrt(gx**2+gy**2),theta(gx,gy),0,0,0]
         ret[i*512+a] = tmp
   printElapsedTime('sobel transformation')
   return ret


def cannyTransformation(image):
    for row in range(HEIGHT):
        for col in range(WIDTH):
            cell = image[row*512+col]

def gradY(row,col,image):
    ret = 0
    if not(row == 0 or col == 0 or row == HEIGHT-1 or col == WIDTH-1):
        xy = row*512+col
        ret=\
                1*(image[xy-513]+ \
                2*image[xy-512]+ \
                1*image[xy-511]+ \
                -1*image[xy+511]+ \
                -2*image[xy+512]+ \
                -1*image[xy+513])
    return ret

def gradX(row,col,image):
    ret = 0
    if not(row == 0 or col == 0 or row == HEIGHT-1 or col == WIDTH-1):
        xy = row*512+col
        ret=\
                -1*(image[xy-513]+ \
                -2*image[xy-1]+ \
                -1*image[xy+511]+ \
                1*image[xy-511]+ \
                2*image[xy+1]+ \
                1*image[xy+513])
    return ret

def normalize(image, intensity = 255):
    m = 0
    for i in image:
        m = max(m,i[0])
    printElapsedTime('normalizing')
    return [int(x[0]*intensity/m) for x in image]

def theta(Gx, Gy):
    from math import atan2
    compute = atan2(Gy, Gx)
    if compute < 0:
        compute += pi
    if 0 <= compute < (pi/8):
        return 0
    if (pi/8) <= compute < (3*pi/8):
        return 1
    if (3*pi/8) <= compute < (5*pi/8):
        return 2
    if (5*pi/8) <= compute < (7*pi/8):
        return 3
    if (7*pi/8) <= compute:
        return 0
    

from tkinter import *
from time import clock
from sys import setrecursionlimit
from random import randint
from math import pi,sqrt,atan2,sin,cos
setrecursionlimit(7000)

root = Tk()
START = clock()
WIDTH = 512
HEIGHT = 512
COLORFLAG = False
HIGH = 45
LOW = 10
NUMBER_OF_TIMES_TO_SMOOTH_IMAGE = 7


def main():
    
    fileName1 = 'lena.ppm'
    file1 = open(fileName1, 'r')
    
    image = [0] *HEIGHT*WIDTH
    

    image = readPixelColorsFromFile(file1)
    
    printElapsedTime('Smoothing')
    image = smoothTheImage(image, 10)

    printElapsedTime('Sobel Trans')
    tmp = image[600]
    image = sobelTransformation(image)
    print(tmp,image[600][0])
    image = normalize(image,255)
    print(tmp,image[600])


    x = ImageFrame(image)
    
    
    
    root.mainloop()    


if __name__ == '__main__': main()
#    
#    fileName2 = 'e:\\grayScale.ppm'
#    saveNumbersToFile(fileName2,image)
#    
#    image = extractNumbersFromFile(fileName2, 'extract from PPM file')
#    
#    fileName3 = 'e:\\smoothed.ppm'
#    for n in range(NUMBER_OF_TIMES_TO_SMOOTH_IMAGE):
#        image = smooth



