# Camboriú Hotel LP

Landing page para o Camboriú Hotel, em Balneário Camboriú. As solicitações de
reserva são enviadas ao CRM do hotel por uma rota de servidor. O WhatsApp
continua disponível para atendimento direto.

## Conteúdo

- capa com chamada principal e botão de reserva
- acomodações do hotel
- comodidades dos quartos
- galeria com fotos reais
- localização, contato e redes sociais
- formulário de reserva com envio protegido ao CRM

## Integração com o CRM

Configure `SITE_LEADS_WEBHOOK_TOKEN` na Vercel do site e no projeto Vercel do
CRM com o mesmo valor. O token é usado somente no servidor; não utilize prefixo
`NEXT_PUBLIC_`. `CRM_SITE_LEADS_URL` aponta para o endpoint do CRM do hotel.
Sem o token, o formulário informa indisponibilidade e nenhum lead é salvo.

## Comandos

```bash
npm run dev
npm run build
npm test
```
