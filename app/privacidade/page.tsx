import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacidade | Camboriú Hotel",
  description: "Informações sobre o uso de dados enviados ao Camboriú Hotel.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-header">
        <Link href="/" aria-label="Voltar ao site do Camboriú Hotel">
          <Image src="/hotel/camboriu-logo.png" alt="Camboriú Hotel" width={112} height={80} />
        </Link>
      </div>
      <article className="privacy-content">
        <p className="privacy-eyebrow">Camboriú Hotel</p>
        <h1>Privacidade e dados pessoais</h1>
        <p>
          Quando você pede informações sobre hospedagem pelo site, por formulários da Meta
          ou por canais de contato do hotel, usamos os dados fornecidos para responder,
          acompanhar sua solicitação e organizar o atendimento.
        </p>

        <h2>Dados recebidos</h2>
        <p>
          Os formulários podem solicitar nome, telefone, e-mail, tipo de acomodação,
          datas de estadia, número de hóspedes e outras respostas que você decidir enviar.
          Também podemos registrar a origem da solicitação, como campanha ou formulário.
        </p>

        <h2>Uso e acesso</h2>
        <p>
          A equipe autorizada do Camboriú Hotel utiliza essas informações para entrar em
          contato, consultar disponibilidade e acompanhar o atendimento no CRM do hotel.
          Os dados enviados pelo site passam pelos serviços de hospedagem e banco de dados
          usados para operar o formulário e o CRM. Solicitações feitas por formulários do
          Facebook ou Instagram também são processadas pela Meta.
        </p>
        <p>
          O site utiliza ferramentas de medição de acesso, como Google Analytics e Google
          Tag Manager. Se você optar por conversar pelo WhatsApp, esse contato ocorre na
          plataforma do WhatsApp.
        </p>

        <h2>Conservação e seus direitos</h2>
        <p>
          As informações são mantidas pelo tempo necessário para o atendimento e para
          cumprir obrigações aplicáveis. Você pode solicitar informações sobre seus dados,
          correção ou exclusão, quando cabível, pelo e-mail abaixo. Para localizar seu
          registro, informe o telefone ou e-mail usado no contato. Podemos pedir uma
          confirmação de identidade antes de atender à solicitação.
        </p>

        <h2>Contato e pedidos de exclusão</h2>
        <p>
          Escreva para <a href="mailto:balneário.camboriuhotel@gmail.com">balneário.camboriuhotel@gmail.com</a>
          {" "}com o assunto &quot;Privacidade&quot; ou &quot;Exclusão de dados&quot;. A equipe do hotel
          analisará a solicitação e responderá pelo mesmo canal.
        </p>
        <Link className="privacy-back" href="/">Voltar ao site</Link>
      </article>
    </main>
  );
}
