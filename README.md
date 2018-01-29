# fluxionScrollbar

[![Build Status](https://travis-ci.org/myTerminal/fluxionScrollbar.svg?branch=master)](https://travis-ci.org/myTerminal/fluxionScrollbar)
[![Code Climate](https://codeclimate.com/github/myTerminal/fluxionScrollbar.png)](https://codeclimate.com/github/myTerminal/fluxionScrollbar)
[![Coverage Status](https://img.shields.io/coveralls/myTerminal/fluxionScrollbar.svg)](https://coveralls.io/r/myTerminal/fluxionScrollbar?branch=master)  
[![Dependency Status](https://david-dm.org/myTerminal/fluxionScrollbar.svg)](https://david-dm.org/myTerminal/fluxionScrollbar)
[![devDependency Status](https://david-dm.org/myTerminal/fluxionScrollbar/dev-status.svg)](https://david-dm.org/myTerminal/fluxionScrollbar#info=devDependencies)
[![peer Dependency Status](https://david-dm.org/myTerminal/fluxionScrollbar/peer-status.svg)](https://david-dm.org/myTerminal/fluxionScrollbar#info=peerDependencies)  
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![License](https://img.shields.io/badge/LICENSE-GPL%20v3.0-blue.svg)](https://www.gnu.org/licenses/gpl.html)

A simple plug-and-play JavaScript scrollbar

> **Note**: fluxionScrollbar is obsolete and no longer updated, see [faded-scrollbar](https://github.com/myTerminal/faded-scrollbar)

## How to use

*fluxionScrollbar* is an easy to use jQuery scrollbar plugin that requires minimal effort to set up on a web-page. Below are simple steps that you need to do to get it working:

1. Include the stylesheet *fluxionScrollbar.css* and the script *fluxionScrollbar.min.js* in the target page along with the required dependencies like jQuery, jQuery-easing and jQuery-mousewheel.
2. Set the dimensions (especially the height) of the lement on which you want the scrollbar to appear.
3. Create an instance of `fluxionScrollbar` with the selector of your desired container.

		var myScrollbar = new fluxionScrollbar(".myContent");

4. Activate the scrollbar with method `activate` on the scrollbar instance.

		myScrollbar.activate();

That is all!
