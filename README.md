# Select Plugin
## Directive for using Select2 with Angular

Select2 is a jQuery plugin for creating beatiful dropdowns and select-boxes. This directive helps to deal with data binding, value loading and other Angular stuff without writing additional html and/or js logic.

## Use cases
  - Binding dropdown values with ng-model
  - Create dropdowns using ng-options
  - Load values from remote server with no additional logic
  - Support for tagging, multiple choices and more
  
## Getting Started

###### Installation
You can install **select-plugin** using **bower:**
```
bower install select-plugin --save
```

###### Usage
Include the source file within your html with a script tag:
```
<script src="bower_components/select-plugin/dist/select.min.js>
```

Add **select-plugin** to your Angular application:
```
angular.module('myApp', ['select.plugin']);
```

And use it as a simple directive on a select element:
```
<select select-plugin"{someOption1: someValue1, someOption2: somevalue2}" ng-model="myModel">
  <option></option>
  <option value="1">1</option>
  <option value="2">2</option>
 </select>
 ```
 
 To make the box a multiselect, add **multiple="multiple"** to your select element. It will not respond to **{"multiple": true}** option.
 For tagging add **{tags: true}** to the list of your preferences. You can use any preferences allowed by the Select2 plugin (for complete list of allowed options refer to [Select2 official documentation](https://select2.github.io/options.html)).
 
 ## Notes
 ####### Syntax Requirements
  - Directive requires **ng-model** directive to run. 
  - You may render your select dropdown using **ng-options** or **ng-repeat**
  - If you want to load data asynchronously, write the results of your AJAX request inside your **ng-model**, and the dropdown will be updated automagically
  
######Events
If a name is provided for your select element, the directive will broadcast **select-change:element_name** event on your current scope when a value is being selected or deselected

##Dependencies
This directive depends on:
  - jQuery ("^3.1.1")
  - Angular ("^1.5.8")
  - Select2 ("^4.0.3")
