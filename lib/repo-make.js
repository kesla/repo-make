request = require('request');
inquirer = require('inquirer');

function convertThis(){
	
	function createRepo(user, pass, repo, desc){
		request.post({

			json: true, 

			url: 'https://api.github.com/user/repos',

			headers:{
				'User-Agent': 'git CL - node'
			},

			auth:{
				username: user,
				password: pass
			}, 

			json:{
				name: repo,
				description: desc
			}

		}, function(err, res, bod){
			if( bod.message === 'Bad credentials'){
				console.log("Could not log in, try again");
				main();

			} else if(bod.message === "Validation Failed"){
				console.log('Repo name already exists, try again');
				main();

			} else{
				console.log("Repo created! \n");
				console.log("Git repo location: "+ bod.clone_url);
			}

		})// end callback

	}// end function

	function main(){
		inquirer.prompt(questions, function(answers){
			createRepo(answers.username, answers.password, answers.repoName, answers.desc);
		});
	}// end main

	var questions = [{
		type:"input",
		name: 'username',
		message: 'Github username'
	},
	{
		type:'password',
		name: 'password',
		message: 'Github password'
	},
	{
		type: 'input',
		name: 'repoName',
		message: "Repo name"
	},
	{
		type: 'input',
		name: 'desc',
		message: 'Repo description',
		default: 'My new repo'
	}
	];

	main();
} // end convert this 

exports.convert = convertThis;
