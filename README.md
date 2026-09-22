# JM Visuals

Site estático em português, feito com HTML, CSS e JavaScript puro. Sem compilação, servidor de aplicação ou dependências de instalação.

## Abrir localmente

Abra `index.html` no navegador. Também é possível usar a extensão Live Server do VS Code ou, se houver Python instalado, executar `python -m http.server 8000` nesta pasta e acessar `http://localhost:8000`.

## Onde editar

- **Textos, seções, SEO e navegação:** `index.html`.
- **Cores, espaçamentos e tamanhos:** variáveis no início de `css/style.css`. Os ajustes de tablet e desktop estão no final.
- **WhatsApp:** `CONFIG.whatsapp` e `CONFIG.message` no início de `js/script.js`. O número atual é `5527999960198`. Se mudar, atualize também os links de alternativa em `index.html` e o telefone exibido em Contato.
- **Instagram:** preencha `CONFIG.instagram` com a URL oficial e `CONFIG.instagramLabel` com o @ correto. Como o perfil não foi informado, os links atuais solicitam o perfil pelo WhatsApp, sem inventar um usuário.
- **Portfólio:** edite a lista `PROJECTS` em `js/script.js`. Cada item tem `title`, `category`, `src`, `alt` e `illustrative`. As categorias devem corresponder exatamente aos filtros. Para fotos reais, use `illustrative: false`. Atualize o aviso em `index.html` quando publicar trabalhos reais.
- **Imagens:** adicione arquivos em `assets/images/`. Prefira WebP ou JPEG comprimido, com até 1920 px para o destaque e 1000 px para a galeria. Use textos alternativos que descrevam as fotos.
- **Vídeos:** coloque MP4 (H.264) em `assets/videos/`. Configure `CONFIG.heroVideo` para o fundo e `CONFIG.showreel` para o vídeo de apresentação. O fundo é silencioso, não inicia com redução de movimento ativada e mantém a foto se falhar. Vídeos da galeria usam `type: 'video'`, `src` e `poster`.
- **Fundadores, equipe, bastidores e equipamento:** substitua os espaços identificados em `#team-gallery`, no HTML, por fotos reais com `alt` descritivo. Nenhum retrato ou equipamento foi inventado.
- **Marca:** o cabeçalho e o rodapé usam uma assinatura tipográfica provisória, editável no HTML. O favicon está em `assets/logo/favicon.svg`. Substitua pela marca oficial quando disponível.

Exemplo de item real de vídeo:

```js
{ title: 'Título autorizado do projeto', category: 'Eventos', type: 'video',
  src: 'assets/videos/projeto.mp4', poster: 'assets/images/capa.jpg',
  alt: 'Descrição da imagem de capa', illustrative: false }
```

O modal exibe imagens inteiras e vídeos com controles, fecha pelo botão, Escape ou clique externo e interrompe o vídeo ao fechar. A data do formulário é opcional e não aceita datas passadas; os demais campos são obrigatórios. A mensagem é preparada no WhatsApp, onde o visitante confirma o envio. Nenhum dado é armazenado pelo site.

## Fotografias de referência

A pasta original estava vazia. As fotografias abaixo foram baixadas do Unsplash exclusivamente para compor referências visuais; **não são trabalhos da JM Visuals, fotos da equipe nem registros identificados como sendo do Espírito Santo**. As imagens estão locais, sem depender do Unsplash durante a navegação.

| Arquivo | Origem |
| --- | --- |
| `coast.jpg` | https://images.unsplash.com/photo-1510414842594-a61c69b5ae57 |
| `wedding.jpg` | https://images.unsplash.com/photo-1519741497674-611481863552 |
| `city.jpg` | https://images.unsplash.com/photo-1486406146926-c627a92ad1ab |
| `event.jpg` | https://images.unsplash.com/photo-1506157786151-b8491531f063 |
| `landscape.jpg` | https://images.unsplash.com/photo-1470770841072-f978cf4d019e |

Google Fonts (Manrope) e Font Awesome são carregados por CDN. Sem internet, a fonte do sistema continua funcionando; os rótulos textuais e de acessibilidade permanecem disponíveis.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie `index.html`, `css/`, `js/`, `assets/` e este README, mantendo os caminhos.
2. Nas configurações do repositório, abra **Pages** e selecione publicação por branch (**Deploy from a branch**).
3. Escolha a branch que contém o site, normalmente `main`, e a pasta raiz (`/ (root)`). Salve.
4. Aguarde a publicação e abra o endereço fornecido pelo GitHub Pages. Os caminhos relativos funcionam tanto em domínio próprio quanto em `usuario.github.io/repositorio/`.
5. No HTML, altere `og:image` para a URL absoluta da imagem no site publicado. Acrescente `og:url` e um link `canonical` com o endereço definitivo. Não foi inventado um domínio antes da publicação.

Antes de divulgar, adicione a marca, o perfil oficial, fotos e vídeos autorizados. Arquivos de vídeo grandes devem ser comprimidos ou hospedados em serviço apropriado, respeitando os limites da hospedagem escolhida.

## Revisão funcional

Revisão automatizada realizada no Chrome: 26 verificações aprovadas, incluindo filtros, abertura/fechamento do modal, retorno do foco, links internos e WhatsApp, validação e composição da mensagem, data passada, menu móvel e ano automático. Foram verificadas larguras de 320, 375, 390, 768, 1024, 1440 e 1920 px, sem rolagem horizontal. O envio real de mensagens não foi realizado. Reprodução de vídeos reais depende da inclusão dos arquivos da empresa.

Verifique em celular e desktop: menu e fechamento por link/Escape, navegação ativa, filtros, modal por teclado e clique externo, formulário com campos vazios, caracteres acentuados, data passada, links de WhatsApp e redução de movimento. O ano do rodapé é automático. O formulário não necessita de backend.
