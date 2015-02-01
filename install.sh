#!bin/bash
base_dir="./src/lib"

function get_latest {

	if [ -e "$(which wget)" ]; then
		echo -e "\033[0;35mcopying phaser.min.js => to $base_dir/phaser.js\033[0m"
		wget -O $base_dir/phaser.min.js https://raw.githubusercontent.com/photonstorm/phaser/master/build/phaser.min.js ;
		echo -e "\033[0;35mcopying phaser.min.js => to $base_dir/jquery.js\033[0m"
		wget -O $base_dir/jquery.min.js http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js
	else
		echo -e "\033[1;30m(error) \033[0;31mwget not installed\033[0m" 
	fi
}

function install_npm {
	if [ -e "$(which npm)" ]; then
		echo "Installing dependencies ... "
		npm install
	fi
}

echo -e "\033[0;35minstalling latest libraries ...\033[0m"
get_latest
install_npm
bower install