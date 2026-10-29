# Design system Papel e Tinta

Padrão visual dos projetos de marceloclr. Vale para **todo projeto novo** e para a evolução dos existentes, salvo quando o projeto declarar uma variante (seção 9).

- **Repositório:** https://github.com/marceloclr/design-system
- **Arquivo bruto (para IAs e ferramentas):** https://raw.githubusercontent.com/marceloclr/design-system/main/design-system.md
- **Tokens prontos:** [`tokens.css`](tokens.css) · **Dicas com fórmula:** [`componentes/dicas.js`](componentes/dicas.js)
- **Origem:** `saneamento/index.html` (setembro de 2026), consolidado em 2026-10-07 com `modulus`/`plantas` (`assets/base.css`) e `apresenta` (temas de slides).

## 1. Princípios

1. **Documento técnico, não painel de marketing.** Papel claro, tinta escura, cor só onde carrega significado. Nada de gradientes decorativos, sombras pesadas ou excesso de cartões.
2. **Todo número se explica.** Valor calculado tem dica com fórmula e insumos (seção 6). Sublinhado pontilhado indica que há explicação.
3. **Cor com papel fixo.** Cada cor nomeada tem um uso; a mesma cor não significa coisas diferentes na mesma tela.
4. **Claro e escuro desde o início.** Todo projeto nasce com os dois temas, pelos mesmos tokens.
5. **Acessível por padrão.** Contraste WCAG AA, foco visível, `prefers-reduced-motion` respeitado.
6. **Português do Brasil** na interface e nos nomes de tokens e classes.

## 2. Tipografia

Família **IBM Plex** (licença OFL), pesos 400, 500 e 600.

| Papel | Fonte | Uso |
|-------|-------|-----|
| Corpo | IBM Plex Sans 400, 14 px / 1,55 | Texto corrente, rótulos, botões (500) |
| Títulos | IBM Plex Serif 600, `letter-spacing: -.01em` | `h1`–`h4`, título das dicas, cabeçalhos de documento |
| Números e código | IBM Plex Mono 400/500 + `font-variant-numeric: tabular-nums` | Valores, tabelas, identificadores, datas em colunas |

Escala de interface: `h1` 19 px, `h2` 17 px, `h3` 15 px, `h4` 13,5 px; texto pequeno 12 px; mínimo 11 px (só legendas). Documentos longos (memoriais, manuais) podem usar `h1` em `clamp(28px, 5vw, 42px)` e corpo 16 px / 1,65, como em `modulus`. Parágrafos com no máximo 72 caracteres de largura.

Para funcionar offline, sirva os arquivos `.woff2` localmente (como `apresenta` faz com `@fontsource/ibm-plex-*`) em vez do Google Fonts.

## 3. Cores

### 3.1 Superfícies, texto e linhas

| Token | Claro | Escuro | Uso |
|-------|-------|--------|-----|
| `--papel` | `#f3f1ec` | `#14171b` | Fundo da página |
| `--papel-2` | `#e9e6e0` | `#1a1e23` | Hover, rodapé de tabela, áreas recuadas |
| `--carta` | `#fffefc` | `#1f242a` | Blocos, cartões, cabeçalho fixo |
| `--carta-2` | `#faf8f4` | `#242a31` | Cabeçalho de tabela, selos |
| `--tinta` | `#1c1f23` | `#e9e6e0` | Texto principal |
| `--tinta-2` | `#4a5058` | `#bab5ac` | Texto secundário |
| `--tinta-3` | `#737a83` | `#8d949d` | Legendas, rótulos, texto tênue |
| `--linha` | `#d9d4cb` | `#2e343b` | Bordas e divisórias |
| `--linha-forte` | `#c1bab0` | `#3e454e` | Bordas em hover, totais |

### 3.2 Cores nomeadas

| Token | Claro | Escuro | Papel típico |
|-------|-------|--------|--------------|
| `--grafite` | `#3f4750` | `#9fa9b4` | Acento padrão, estrutura, botão primário |
| `--latao` | `#8d7130` | `#c4a45e` | Destaque nobre, marca, filetes, insuficiência |
| `--musgo` | `#4c6847` | `#87ab7f` | Sucesso, concluído, vegetação |
| `--ardosia` | `#3f5c78` | `#7ba3c8` | Links, foco, análise, informação |
| `--ferrugem` | `#8a5240` | `#c68a74` | Atenção moderada, alvenaria/cerâmica |
| `--ameixa` | `#655070` | `#ab92b8` | Categoria auxiliar |
| `--ocre` | `#867123` | `#c0aa4e` | Alerta |
| `--carmim` | `#8b3a3a` | `#cf7d7d` | Risco, erro, exclusão |
| `--petroleo` | `#2f5f61` | `#64a7a9` | Categoria auxiliar, água, manifestação |
| `--sepia` | `#6f5a43` | `#c0a281` | Decisão, histórico, madeira |

### 3.3 Semânticas

`--ok` = musgo · `--alerta` = ocre · `--risco` = carmim · `--neutro` = tinta-3 · `--link` = ardósia.

### 3.4 Acento por contexto

Cada aba, módulo ou etapa define `--acento` (e `--cor` em cartões e etiquetas) a partir das cores nomeadas, por exemplo `style="--acento: var(--musgo)"`. O acento aparece no filete esquerdo do bloco, no título do bloco, na aba selecionada e no segmento ativo. `--acento-tenue` e `--acento-medio` destacam colunas ou linhas correntes.

### 3.5 Contraste (WCAG 2.1, conferido em 2026-10-07)

No tema escuro, todas as cores passam de 4,5:1 sobre `--papel` e `--carta`. No tema claro, três ficam abaixo de 4,5:1 sobre `--papel` (e `--tinta-3` também sobre `--carta`); nesses casos, use-as só em texto ≥ 18 px, em texto ≥ 14 px seminegrito, em bordas ou em elementos não textuais:

| Token | sobre papel (claro) | sobre carta (claro) |
|-------|---------------------|---------------------|
| `--tinta-3` | 3,84 | 4,30 (também abaixo) |
| `--latao` | 4,10 | 4,59 |
| `--ocre` | 4,23 | 4,74 |

Regra prática: `--tinta-3` só em legendas e rótulos não essenciais; texto pequeno que precisa ser lido usa `--tinta-2` (7,2:1 sobre papel). Valores em latão ou ocre no tema claro, só sobre `--carta` e com ≥ 14 px seminegrito.

## 4. Forma e profundidade

| Token | Valor | Uso |
|-------|-------|-----|
| `--raio` | 12 px | Blocos, cartões, tabelas |
| `--raio-p` | 7 px | Botões, campos, abas, dicas |
| `--sombra` | sutil, quase só uma linha | Blocos e cartões |
| `--sombra-alta` | difusa | Dicas, gavetas, modais |
| Pílula | `border-radius: 99px` | Selos, segmentos, etiquetas |

Espaçamento em múltiplos de 2 px, com os valores mais comuns 4, 8, 12, 16, 20. Conteúdo principal com `max-width` de 1360 a 1560 px.

## 5. Componentes

Todos estão em [`tokens.css`](tokens.css).

- **Cabeçalho fixo** (`.topo`): fundo `--carta`, linha inferior, marca de 34 px com gradiente grafite → ardósia e inicial em Plex Serif.
- **Abas** (`.aba`): texto `--tinta-3`; selecionada com `--cor` no texto e numa borda inferior de 2 px; pode ter um número em círculo e um subtítulo pequeno que some abaixo de 760 px.
- **Segmentos** (`.segmentos` / `.seg`): pílulas dentro de uma pílula; o ativo usa fundo `--acento`.
- **Bloco** (`.bloco`): seção de conteúdo; `--carta`, borda, filete de 3 px em `--acento` à esquerda, título na cor do acento, legenda à direita. Variantes `.tenor-alerta` e `.tenor-risco` trocam o filete.
- **Cartão de indicador** (`.cartao`): rótulo pequeno, valor em Mono 23 px na cor `--cor`, nota abaixo; barra de 3 px à esquerda.
- **Tabela:** cabeçalho em `--carta-2`, números à direita (`td.n`) em tabular, rodapé fixo em `--papel-2`, só linhas horizontais.
- **Botão** (`.btn`): `--carta` com borda; `.primario` em `--acento`. Todo botão faz algo: nada de botão sem ação ou "em breve".
- **Selo** (`.selo`): pílula com ponto colorido, para estado (base carregada, DEMONSTRAÇÃO, sincronizado).
- **Etiqueta** (`.etq`): pílula com borda e texto em `--cor` e fundo a 10%.
- **Gaveta:** painel lateral com `width: min(660px, 96vw)` e `--sombra-alta`.

Transições curtas (0,12 a 0,2 s, `ease-out`); a entrada de painéis sobe 3 px com fade (`@keyframes surgir`).

## 6. Dicas com fórmula

Padrão obrigatório para valores calculados e controles não óbvios. Use [`componentes/dicas.js`](componentes/dicas.js):

```html
<span class="calc" tabindex="0" data-tip-t="Saldo disponível"
      data-tip="Fórmula: dotação − empenhado
                Dotação: R$ 1.200.000,00
                Empenhado: R$ 830.000,00">R$ 370.000,00</span>
```

- Cada linha do `data-tip` vira uma linha; o prefixo `Rótulo:` sai em negrito.
- Valor calculado: primeira linha com a **fórmula**, depois os **insumos** com seus valores e a fonte quando houver.
- Botão: diga o que acontece e onde o resultado fica (ex.: "Grava uma nova versão da sessão no computador, no GitHub ou nos dois").
- `tabindex="0"` em elementos não focáveis, para teclado e toque.
- O balão é único e fixo no `body`; nunca use o `title` nativo como substituto.

## 7. Temas claro e escuro

- Claro por padrão. `<html data-tema="escuro">` força o escuro; `<html data-tema="claro">` força o claro; sem atributo, segue `prefers-color-scheme`.
- Ofereça um botão de alternância e guarde a escolha em `localStorage` (com `try/catch`).
- Gráficos (Chart.js e afins) leem as cores dos tokens via `getComputedStyle` e são redesenhados ao trocar de tema.
- SVGs inline usam `currentColor` ou `var(--token)`, nunca cor fixa.

## 8. Dados, números e textos

- Moeda `R$ 1.234,56`; milhar com ponto; decimal com vírgula; datas `dd/mm/aaaa` (horário `HH:mm`); `Intl.NumberFormat('pt-BR')`.
- Números sempre em Mono tabular e alinhados à direita em tabelas.
- Dados fictícios exibem o selo **DEMONSTRAÇÃO**.
- Erros em linguagem simples; detalhes técnicos recolhidos em "Detalhes técnicos".
- Paleta de séries de gráfico, nesta ordem: ardósia, musgo, latão, ferrugem, petróleo, ameixa, ocre, sépia. Carmim só para série negativa ou de risco.

## 9. Variantes registradas

| Projeto | Variante | Diferenças |
|---------|----------|------------|
| `saneamento` | **Referência** | É a origem dos tokens |
| `modulus`, `plantas` | Arquitetura | Nomes em inglês (`--bg`, `--ink`, `--brass`, `--moss`, `--patina`, `--slate`, `--rust`, `--steel`, `--graphite`, `--plum`); tokens de planta (`--suite-*`, `--social-*`, `--apoio-*`, `--win`, `--door`, `--struct-*`); escuro azul-petróleo (`#0F2840`) com acentos saturados; títulos em Plex Serif 500; corpo 16 px |
| `apresenta` | Slides | Quatro temas (aurora, marfim, grafite, nanquim) com variáveis `--s-*`; marfim e nanquim usam latão e musgo; corpo ≥ 28 px em 1920 × 1080 |
| `dani` (Construction 4D Studio) | Visualização 3D | Usa estes tokens na interface; a cena 3D tem cores próprias de material, e os estados construtivos usam `--latao` (em execução), `--musgo` (concluído) e `--tinta-3` translúcido (fantasma) |

| `seplag-emendas` (e, depois, `seplag-entregas-mapp`) | Marca do Governo do Ceará | Assinatura horizontal oficial em vetor (`assets/marca/`, do Manual de Identidade Visual do Governo do Ceará 2023-2026): colorida no tema claro, negativa vazada no escuro, mínimo de 30 mm. A cor oficial do contorno e dos nomes (`#465564`, Pantone 7545 C, vizinha do `--grafite`) entra só na faixa da capa do PDF; gráficos, cartões e acentos seguem os tokens daqui. As fontes da marca (Kanit e Maitree) não substituem o IBM Plex |

Projetos fora do padrão hoje: `seplag`, `seplag2` (Plus Jakarta Sans e JetBrains Mono), `sipog` (Kanit), `sys-comm`, `minutar` e `viagens`. Não migre sem pedido; em mudança grande de interface, proponha a migração.

## 10. Como usar num projeto

1. Copie `tokens.css` (e `componentes/dicas.js`, se houver números calculados) para o projeto, ou referencie o arquivo bruto.
2. Defina `--acento` por aba ou módulo.
3. Implemente o botão de tema (seção 7).
4. Antes de publicar, confira: contraste (seção 3.5), foco visível, `prefers-reduced-motion`, largura de 360 px sem rolagem horizontal, dicas em todos os valores calculados.

Mudanças no padrão são feitas **aqui** primeiro e depois propagadas, registrando a data no histórico abaixo.

## Histórico

- 2026-10-29: variante "Marca do Governo do Ceará" registrada para os relatórios da Seplag (seção 9).
- 2026-10-07: `.segmentos` e `.seg` incluídos em `tokens.css` (faltavam; usados pelo dani).
- 2026-10-07: consolidação inicial a partir de `saneamento`, `modulus`/`plantas` e `apresenta`; contraste conferido; `tokens.css` e `dicas.js` extraídos.
