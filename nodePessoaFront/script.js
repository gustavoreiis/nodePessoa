document.addEventListener('DOMContentLoaded', async () => {
    const idPessoa = localStorage.getItem('editPessoaId');
    if (idPessoa) {
        try {
            const response = await fetch(`http://localhost:3000/api/pessoas/${idPessoa}`);
            const pessoa = await response.json();

            document.getElementById('idPessoa').value = idPessoa;
            document.getElementById('nome').value = pessoa.Nome;
            document.getElementById('cpf').value = pessoa.CPF;
            document.getElementById('telefone').value = pessoa.Telefone;

            document.getElementById('tituloForm').innerText = 'Editar Pessoa';
            document.getElementById('botaoEnviar').innerText = 'Salvar Alterações';

            localStorage.removeItem('editPessoaId');
        } catch (error) {
            console.error('Erro ao buscar pessoa:', error);
        }
    }
});

document.getElementById('formPessoa').addEventListener('submit', async (event) => {
    event.preventDefault();

    const idPessoa = document.getElementById('idPessoa').value;
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;

    const pessoaData = {
        Nome: nome,
        CPF: cpf,
        Telefone: telefone
    };

    try {
        let response;
        if (idPessoa) {
            response = await fetch(`http://localhost:3000/api/pessoas/${idPessoa}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pessoaData)
            });
        } else {
            response = await fetch('http://localhost:3000/api/pessoas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pessoaData)
            });
        }

        const result = await response.json();

        if (response.ok) {
            document.getElementById('message').innerHTML = idPessoa ? 'Pessoa editada com sucesso.' : 'Pessoa cadastrada com sucesso.';
            document.getElementById('formPessoa').reset();
            resetForm();
        } else {
            document.getElementById('message').innerHTML = `Erro: ${result.message}`;
        }
    } catch (error) {
        document.getElementById('message').innerHTML = 'Erro na comunicação com o servidor.';
    }
});

const resetForm = () => {
    localStorage.removeItem('editPessoaId');
    document.getElementById('tituloForm').innerText = 'Cadastro de Pessoa';
    document.getElementById('botaoEnviar').innerText = 'Enviar';
};
