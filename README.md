# d3-generative-poster-contempoflux
A custom software written using D3 to create a printable generative poster directly from Chrome. Made originally for UCLA's [ContempoFlux](http://www.music.ucla.edu/contempo-flux-contemporary-music-ensemble) Spring 2015, a contemporary music ensemble. The modern nature of the music makes a perfect pairing with creative coding and generative works. 

![http://jssolichin.com/wp-content/uploads/2015/05/IMG_1717-ANIMATION1.gif]
![http://jssolichin.com/wp-content/uploads/2015/05/IMG_1702.jpg]
![http://jssolichin.com/wp-content/uploads/2015/05/IMG_1710.jpg]
![http://jssolichin.com/wp-content/uploads/2015/05/Final-24x36.jpg]

#Artist Statement
Just like music, the visual art is a collection of elements strung together into a structure where the whole is more than the parts. When I first heard the music for Contempoflux, the eclecticism and the tension between the structured and unstructured/classical and modern, really resonated with me. As a creative coder, the melding of different loci is familiar, being parallel to the merging of expressive art with the rigid code.  I hope these generative posters highlight the beauty in these oppositions and their harmony together. 

#Usage
1. `$ bower install`
2. (Optional) Set options in `script.js`; see section below.
2. Open in a browser (tested in Chrome).
3. Print directly from the browser. (Note: Chrome can only go up to Tabloid (11x17) so use the system print dialog to print 24x36).

#Options
* Set `large24x36Version` to `true`, if you want to print a 24x36 version. 
* Set `graphicOption` to change the "seed" of the generated image. 
* Set `multiColor` to `false` if you just want a grayscale poster. 
* Set `colors` variable to change the generative line colors.
* Set `oneColorIndex` to an index of the variable `colors` to do one color only. 
* Changing text to fit your own should be self explanatory. 

#Warning
Note that it is possible for the printed poster to look different than the screen. 

This is due to the way printers work. In order to get the crispest line, this generator does not convert its information into raster or anything else. When you print, some of the outlines' baseline are outside of the paper and thus the printer does not print it. This is why the background seems less dense at the bottom than at the top.

This unexpected behavior actually makes for a more interesting poster as the background fades away towards the bottom, which makes the information text actually more legible. 

To remove any gradient behavior, makes sure the `graphicOption.max` is set so that the largest outline text is within the page boundaries.

#Why D3?
D3 can utilize SVG which means that it can easily work with text, in contrast to other creative coding platform like Processing or OF. Built in is the ability to show only font outlines, and change baseline. Such features are critical to how the image is generated. 

One drawback with D3 is that it is not as easy to turn the generated SVG into printed PDF. If anything, I hope this helps other create their own generative poster using d3 and other web tools by providing relatively accurate svg canvas size to print on to tabloid and 24x36" papers. 