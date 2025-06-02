# Sistema Vendinha - Controle de Dívidas

Este é um projeto desenvolvido com [Next.js](https://nextjs.org/) para o controle de dívidas de clientes. Ele oferece funcionalidades como cadastro de dívidas, registro de pagamentos, filtros e geração de relatórios.

## ✨ Visão Geral

O Sistema Vendinha é uma aplicação web simples e intuitiva para gerenciar as dívidas de clientes. Ele foi projetado para ser fácil de usar, com foco na eficiência e na organização das informações financeiras.

**Principais funcionalidades:**

* **Autenticação de Usuário:** Sistema de login com senha simples (`admin123`) e opção de recuperação de senha via palavra secreta (`vendinha`).
* **Cadastro de Dívidas:** Permite registrar novas dívidas com informações como nome do cliente, CPF, telefone, valor total, valor pago e observações.
* **Controle de Pagamentos:** Atualize o valor pago de uma dívida, com opções para adicionar pagamentos parciais ou definir o valor total pago.
* **Status da Dívida:** As dívidas são automaticamente atualizadas para "QUITADA" quando o valor pago atinge ou excede o valor total.
* **Filtros e Busca:** Filtre as dívidas por CPF, mês e status (Pendente/Quitada).
* **Exclusão de Dívidas:** Opção para excluir todas as dívidas relacionadas a um CPF específico.
* **Relatórios:** Gere relatórios detalhados das dívidas, incluindo resumos financeiros e informações de cada dívida, com opção de download em formato de texto.
* **Persistência de Dados:** Os dados são salvos localmente no navegador (localStorage) para simplicidade, não sendo necessário um backend.

## 🚀 Tecnologias Utilizadas

O projeto é construído com as seguintes tecnologias:

* **Next.js 15.2.4**: Um framework React para desenvolvimento de aplicações web com renderização do lado do servidor e otimizações de performance.
* **React 19**: Biblioteca JavaScript para construção de interfaces de usuário.
* **TypeScript 5**: Superset do JavaScript que adiciona tipagem estática.
* **Tailwind CSS 3**: Um framework CSS utilitário para estilização rápida e responsiva.
* **Shadcn/ui**: Componentes de UI construídos com Radix UI e estilizados com Tailwind CSS, para uma experiência de desenvolvimento consistente e acessível.
* **Lucide React**: Biblioteca de ícones personalizáveis.
* **Zod**: Biblioteca de validação de esquemas.
* **React Hook Form**: Para gerenciamento de formulários.
* **date-fns**: Para manipulação de datas.
* **embla-carousel-react**: Para funcionalidade de carrossel (se aplicável, embora não diretamente visível nas funcionalidades principais, pode ser um componente base).
* **recharts**: Para visualização de dados em gráficos (se aplicável).
* **sonner**: Para notificações e toasts.
* **vaul**: Para drawers (se aplicável, embora não diretamente visível nas funcionalidades principais, pode ser um componente base).
* **next-themes**: Para gerenciamento de temas (claro/escuro).

## 💻 Primeiros Passos

Para rodar este projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/en/) (versão 18.18.0 ou superior) e o seu gerenciador de pacotes preferido (npm, yarn, pnpm ou bun) instalados em sua máquina.

### Instalação

1.  Clone o repositório para o seu ambiente local:

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd vendinha-interfocus
    ```

2.  Instale as dependências do projeto. Você pode usar um dos seguintes comandos, dependendo do seu gerenciador de pacotes:

    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    # ou
    bun install
    ```

### Rodando a Aplicação

Para iniciar o servidor de desenvolvimento, execute um dos comandos abaixo:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev

Após a execução do comando, abra http://localhost:3000 no seu navegador para ver a aplicação em funcionamento.

Credenciais de Acesso
Senha de Login: admin123
Palavra Secreta para Recuperação: vendinha
🛠️ Desenvolvimento
Você pode editar a página principal modificando app/page.tsx.
As alterações no código serão automaticamente refletidas no navegador.
Este projeto utiliza next/font para otimizar e carregar automaticamente a fonte Geist.
📚 Saiba Mais
Para mais informações sobre o Next.js, consulte os seguintes recursos:

Documentação do Next.js - explore os recursos e a API do Next.js.
Aprenda Next.js - um tutorial interativo.
Confira também o repositório do Next.js no GitHub — sua contribuição é bem-vinda!.
☁️ Deploy
A maneira mais fácil de fazer o deploy da sua aplicação Next.js é usando a plataforma Vercel, criada pelos desenvolvedores do Next.js. Para mais detalhes, veja a documentação de deploy do Next.js.

👤 Desenvolvedor
Este projeto foi criado por Martin de Almeida.
