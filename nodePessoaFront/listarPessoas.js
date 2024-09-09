document.addEventListener('DOMContentLoaded', () => {
    const pessoaTableBody = document.querySelector('#tabelaPessoa tbody');

    const fetchPessoas = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/pessoas');
            if (!response.ok) {
                throw new Error('Erro ao buscar pessoas');
            }
            const pessoas = await response.json();
            updateTable(pessoas);
        } catch (error) {
            console.error('Erro na requisição:', error);
            pessoaTableBody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Erro ao carregar pessoas.</td></tr>';
        }
    };

    const updateTable = (pessoas) => {
        pessoaTableBody.innerHTML = '';
        pessoas.forEach(pessoa => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pessoa.Nome}</td>
                <td>${pessoa.CPF}</td>
                <td>${pessoa.Telefone}</td>
                <td>
                    <button class="btn btn-warning btn-sm botaoEditar" data-id="${pessoa.Id}">Editar</button>
                    <button class="btn btn-danger btn-sm botaoExcluir" data-id="${pessoa.Id}">Excluir</button>
                </td>
            `;
            pessoaTableBody.appendChild(row);
        });

        document.querySelectorAll('.botaoEditar').forEach(button => {
            button.addEventListener('click', editar);
        });
        document.querySelectorAll('.botaoExcluir').forEach(button => {
            button.addEventListener('click', excluir);
        });
    };

    const editar = async (event) => {
        const id = event.target.getAttribute('data-id');
        localStorage.setItem('editPessoaId', id);
        window.location.href = 'index.html';
    };

    const excluir = async (event) => {
        const id = event.target.getAttribute('data-id');
        const confirmDelete = confirm('Você tem certeza que deseja excluir esta pessoa?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/api/pessoas/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Pessoa excluída com sucesso');
                    fetchPessoas();
                } else {
                    alert('Erro ao excluir a pessoa');
                }
            } catch (error) {
                console.error('Erro ao excluir pessoa:', error);
                alert('Erro ao excluir a pessoa');
            }
        }
    };

    fetchPessoas();
});