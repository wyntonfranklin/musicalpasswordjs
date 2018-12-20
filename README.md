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

3. Call the plugin:

```javascript
$("#element").musicalpassword({
    timer: false
});
```



### Options

- timer:
  Adding a  time value to your password. You will have to play the tune within the correct time.



### Demo

https://wyntonfranklin.github.io/musicalpasswordjs/