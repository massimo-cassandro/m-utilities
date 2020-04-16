/*jshint node: true */
// gulp --gulpfile mail-gulpfile.js --verbose

var gulp = require('gulp'),
	emailBuilder = require('gulp-email-builder'),
	replace = require('gulp-replace'),
	rename = require('gulp-rename')
;

var current_date = new Date().toString(),
	proj = 'webinar',
	remote_imgs_basepath = '',
	dest_folder = '../../../views/Email'
;
var email_builder_options = {
  	encodeSpecialChars: true,

/*
	emailTest : {
		// Your Email
		email : 'myemail@email.com',

		// Your email Subject
		subject : proj + ' [' + current_date + ']',

		// Optional
		transport: {
			type: 'SMTP',
			options: {
				service: 'gmail',
				auth: {
					user: '',
					pass: ''
				}
			}
		}
	},
*/
/*
	litmus : {

		// Optional, defaults to title of email or yyyy-mm-dd if <title> and options.subject not set
		subject : proj,

		// Litmus username
		username : 'XXXX',

		// Litmus password
		password : 'XXXXX',

		// Url to your Litmus account
		url : 'https://XXXX.litmus.com',

		// Email clients to test for. Find them at https://litmus.com/emails/clients.xml
		// The <application_code> tags contain the name e.g. Gmail Chrome: <application_code> chromegmailnew </application_code>
		applications : ['androidgmailapp','gmailnew', 'iphone5s']
	}
*/

};


function gulp_task(item) {

	gulp.task(item.src, function() {

		console.log('**** Processing `' + proj + ' :: ' + item.src + '` (' + current_date + ') *****');

		gulp.src([ './' + item.src ])
		.pipe(replace(/src="\/bundles\//g, 'src="' + remote_imgs_basepath + '/bundles/' ))
	  	.pipe(emailBuilder(email_builder_options).build())
	  	.pipe(rename(function (path) {
		    if(item.rename_extension) {
		   		path.extname = ".html.twig";
		   	}
		}))
	  	.pipe(gulp.dest(dest_folder));
	});
}

var email_files = [
	{src: 'src1.html', rename_extension: true},
	{src: 'src2.html.twig', rename_extension: false}
],
defaultTasks = [];

for (var i = 0; i<email_files.length; i++) {
  defaultTasks.push(email_files[i].src);
	gulp_task(email_files[i]);
}
gulp.task('default', defaultTasks);
