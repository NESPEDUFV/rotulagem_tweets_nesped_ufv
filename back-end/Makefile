executarJupyter:
	jupyter-notebook
instalarDependenciasPacotesPip:
	sudo apt-get install libspatialindex-dev -y
instalarPython38EDependencias:
	sudo apt-get update
	sudo apt-get install software-properties-common -y
	sudo add-apt-repository ppa:deadsnakes/ppa -y
	sudo apt-get update
	sudo apt-get install python3.8 -y
	sudo apt-get install python3.8-dev -y
	sudo apt-get install python3.8-venv -y
	sudo apt-get install python3.8-tk -y
criarAmbienteVirtualenv:
	python3.8 -m venv ambiente-rotulador
	ambiente-rotulador/bin/pip3.8 install --upgrade pip
	ambiente-rotulador/bin/pip3.8 install -r requirements.txt
	clear
	echo "Pacotes instalados:"
	ambiente-rotulador/bin/pip3.8 freeze
atualizarAmbienteVirtualenv:
	ambiente-rotulador/bin/pip3.8 install --upgrade pip
	ambiente-rotulador/bin/pip3.8 install -r requirements.txt
	clear
	echo "Pacotes instalados:"
	ambiente-rotulador/bin/pip3.8 freeze
removerAmbienteVirtualenv:
	rm -r ambiente-rotulador/
temaMonokaiJupyter:
	jt -t monokai -f fira -fs 11 -nf ptsans -nfs 13 -N -kl -cursw 2 -cursc r -cellw 95% -T
	# Documentação: https://github.com/dunovank/jupyter-themes
	# Opções de temas:
	# onedork
	# grade3
	# oceans16
	# chesterish
	# monokai
	# solarizedl
	# solarizedd
