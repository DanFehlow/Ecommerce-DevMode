# Ecommerce-DevMode
CRUD referente plataforma de Ecommerce.

Step 1: A página inicial deste projeto possui o botão de adicionar o novo produto, conforme imagem abaixo: 

![image](https://github.com/DanFehlow/Ecommerce-DevMode/assets/86863914/f7b38780-e83e-4e3e-aa33-f1faad825ab6)

Step 2: Após o clique no botão de "adicionar o novo produto", o usuário sera direcionado ao modal onde precisará especificar as caracteristicas do produto, como nome, valor e local da imagem na web.

![image](https://github.com/DanFehlow/Ecommerce-DevMode/assets/86863914/11f33ca0-3b9b-4025-b950-8937ec5b3990)

Step 3: Após adicionar essas informações, este produto será salvo no localStorage, denominado de "database" e o print desses dados no localStorage será em outra pagina HTML, conforme abaixo:

![image](https://github.com/DanFehlow/Ecommerce-DevMode/assets/86863914/0f635fa2-765b-417e-899e-f1dff0e0098f)

Step 4: Como podemos observar na imagem acima, os produtos adicionados possuem um botão com "Adicionar ao carrinho", após o clique neste botão o produto em escopo será salvo em outro localStorage, desta vez denominado de "cartadd".
O print desses produtos, com informações, preço e quantidade são visualizados pelo usuário em outro arquivo HTML em uma nova aba do navegador, conforme imagem abaixo:

![image](https://github.com/DanFehlow/Ecommerce-DevMode/assets/86863914/0f068624-1174-421d-ae0e-842d3f27992c)

Os produtos são carregados com a quantidade padrão de "1" unidade e esta pagina permite ao usuário adicionar ou diminuir a quantidade desejada, atualizando o preço individual de cada produto, assim como o subtotal das quantidades dos produtos adicionados e preço, conforme imagem abaixo:

![image](https://github.com/DanFehlow/Ecommerce-DevMode/assets/86863914/7b4b1856-0e4a-46bc-b822-d6457254fd4b)

Step 5: Como podemos observar abaixo de cada valor do produto, existe um "span" que permite ao usuário deletar o produto do seu carrinho de compras, após o clique neste span, o produto será deletado do localStorage "cartadd" e a pagina será atualizada com o novo print dos produtos que constam no momento 2 do banco de dados,
conforme imagem abaixo:
![image](https://github.com/DanFehlow/Ecommerce-DevMode/assets/86863914/97c900d3-13c2-42fe-bec4-3742963b21fe)
