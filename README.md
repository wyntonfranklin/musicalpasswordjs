# musicalpasswordjs

### A jQuery plugin that allows you to create a password using musical notes.

Musical password allows you to create passwords with musical notes. It creates a code for every notes played and enters that into your password field. It can then be saved to a database. When attempting to login play the same tune that you used to create the password.

### Usage

1. Include jQuery

```javascript
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
```

2. Include plugin's code

```javascript
<script src="build/musicalpassword.min.js"></script>
```

3. Add the assets folder with the all the mp3 files.
   Use need to add the assets folder to you working directory. The assets has the mp3 files you need to play the sounds.

4. Call the plugin

```javascript
$("#element").musicalpassword({
    timer: false
});
```



### Options

- timer: true | false
  Adding a  time value to your password. You will have to play the tune within the correct time.
- assetsBaseDir: "file/path"
  The location of the base directory where the assets can be found. The plugin will look in the folder to find the mp3 files to play.
- keyslistener: true | false
  Listen to certain keyboard inputs and play the sounds associated with them. ( C, D, E, F, G, A, B)



### Events

- donebuttonpressed.musicalpassword:
  The done button has been pressed. This occurs if the timer is active.
- clearinput.musicalpassword:
  The input has been cleared using the clear button

### Demo

http://www.igestdevelopment.com/musicalpasswordjs/



### Compatibility

This plugin uses the HTMLAudioElement to play the audio files.

https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement