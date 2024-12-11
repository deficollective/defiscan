import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Terms v.2",
};

export default function TermsPage() {
  return (
    <div className="container relative mb-20 max-w-6xl py-6 lg:py-10">
      <h1 className="inline-block  tracking-tight text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
        User Terms v.2 (2024-12-03)
      </h1>

      <p></p>

      <h1 className="inline-block mt-10  tracking-tight text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
        Scope
      </h1>

      <div className="flex-1 mt-6 text-center text-muted-foreground lg:text-start xl:text-base">
        <p>
          These terms and conditions ("<strong>Terms</strong>") apply to your ("<strong>you</strong>" or "<strong>User</strong>")
          access and use ("<strong>use</strong>") of the website available on [URL] ("<strong>Website</strong>")
          and (if any) all related content, features and tools (collectively
          "<strong>DeFiScan</strong>"). DeFiScan is administered and maintained by the DeFi
          Collective, a non-profit organization to further the decentralization
          of financial infrastructure ("<strong>Collective</strong>"), with the support of the
          DeFi community.
        </p>

        <p className="mt-4">
          Please read these Terms carefully. They contain important information
          regarding the use of DeFiScan, important disclaimers, limitation of
          liability, intellectual property rights and submission to
          jurisdiction. Each time you use DeFiScan by any means, you irrevocably
          agree to these Terms in the then-applicable version, and you may not
          (continue) to use DeFiScan if you do not agree to these Terms in full
          and without limitation.
        </p>
      </div>

      <h1 className="inline-block mt-10  tracking-tight text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
        DeFiScan; Important Disclaimers
      </h1>

      <div className="flex-1 mt-6 text-center text-muted-foreground lg:text-start xl:text-base">
        <p>
          DeFiScan is an open platform providing information about the
          decentralization of third-party DeFi protocols ("<strong>Protocols</strong>"),
          including decentralization reviews ("<strong>Review(s)</strong>") as well as other
          content, features and tools (collectively "<strong>Content</strong>"). DeFiScan is
          provided as a freely available public good to further decentralization
          in DeFi by creating a common understanding and individualized
          measurement of decentralization in Protocols.
        </p>

        <p className="mt-4">You understand and acknowledge that:</p>

        <ul className="mt-4 pl-5 list-disc list-outside">
          <li>
            <strong>Informational purposes only</strong>: DeFiScan and all
            Content is provided solely for informational purposes.
          </li>
          <li>
            <strong>No representations or warranties; no guarantees</strong>:
            Neither the Collective nor individually its directors or
            contributors or any of the authors of the Reviews represent or
            warrant, and they do not make any guarantees of any sort (explicit
            or implicit) with respect to, any element of DeFiScan or any of the
            Content, including but not limited to any warranty or guarantee of
            accuracy, free from error, completeness, timeliness, actuality,
            relevance, suitability for any particular purpose or availability at
            all times. DeFiScan and all Content is strictly provided "as is" and
            "as available".{" "}
          </li>
          <li>
            <strong>
              Content may be wrong, incomplete or outdated at any time
            </strong>
            : Any of the Content may, at any time, be wrong, incomplete or out
            of date. The Collective has no obligation to keep the Content up to
            date and may not do so.{" "}
          </li>
          <li>
            <strong>
              No endorsement or recommendation of any particular Protocol
            </strong>
            : Any Content, particularly the Reviews and decentralization scores
            assigned in connection with the Reviews, purely represent the
            opinion of the Collective and the individual authors about the
            decentralization of a Protocol based on the publicly available
            decentralization framework of the Collective, which may itself be
            incomplete, contain errors, or be out of date. None of the Content
            intends to be any sort of endorsement or recommendation to use,
            participate in, invest in or in any other way engage with a Protocol
            or any associated token.{" "}
          </li>
          <li>
            <strong>
              No tool for individual (financial or non-financial) decisions to
              interact with DeFi
            </strong>
            : DeFiScan does not, and does not intend to, make any statement
            about any other element of any Protocol other than its
            decentralization status under all limitations and restrictions as
            outlined in the Content and the Reviews. DeFiScan is not, and does
            not intend to be, a tool to assess economic viability, prospect and
            risk, technical security, legal or regulatory nature and risk or any
            other element or risk whatsoever of Protocols (and particularly the
            related tokens) or a tool to base your decision on to interact with
            a Protocol. In particular, the decentralization score assigned in
            connection with the Reviews does not make any statement whatsoever
            with regard to any of the aforementioned elements and risks. You
            acknowledge and understand that DeFi is inherently risky on various
            levels and that centralization vectors (as DeFiScan is concerned
            with) are only of many risks in connection with using DeFi which are
            not in any way assessed or addressed by DeFiScan.
          </li>
          <li>
            <strong>No advice</strong>: Neither DeFiScan nor any of the Content
            constitutes technical, economical, financial, investment, legal or
            tax, or any other sort of advice to Users.{" "}
          </li>
          <li>
            <strong>
              Content may be provided by or in collaboration with third-parties,
              including Protocols
            </strong>
            : Some of the Content may be provided directly by third-parties. The
            Collective is not liable or responsible in any way for such Content
            (please also see below). Some of the Content, particularly the
            Reviews, may be provided in collaboration or acknowledgment with
            third-parties, which may include the Protocols.{" "}
          </li>
        </ul>

        <p className="mt-4">
          You furthermore understand and acknowledge that DeFi technology in
          particular, and smart contracts, blockchains, cryptographic tokens,
          and related systems and software in general, are nascent, highly
          experimental, risky, and subject to constant change. The Collective
          aims to further the public understanding of these technologies, but is
          not here to give you advice or offer you any services of any sort. You
          are solely responsible for any of your use of such technologies and we
          strongly recommend anyone to thoroughly understand the risk associated
          with the use of such technologies before engaging with them. Do your
          own research.
        </p>
      </div>

      <h1 className="inline-block mt-10  tracking-tight text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
        Limitation of liability; indemnification
      </h1>

      <div className="flex-1 mt-6 text-center text-muted-foreground lg:text-start xl:text-base">
        <p>
          <strong>Limitation of liability</strong>: To the maximum extent
          permitted by applicable law, the Collective and its directors and
          contributors are not liable for any sort of direct, indirect,
          consequential or any other sort of damages of a User arising out of or
          in connection with DeFiScan. It is re-emphasized that DeFiScan is
          provided as a free public good to educate the DeFi Space, but that no
          User should base any individual (financial or other) decisions on any
          of the Content, and that the Collective or any individual director or
          contributor cannot be held liable should Users do so.
        </p>

        <p className="mt-4">
          <strong>Indemnification</strong>: To the maximum extent permitted by
          applicable law, you agree to indemnify and hold the Collective, its
          directors and contributors (each individually and collectively)
          harmless from any claim or demand (including attorneys’ fees and any
          losses, fines, fees or penalties imposed by any regulatory authority)
          arising out of your breach of these Terms, your violation of any law
          or regulation or your use of the DeFiScan or any claim that any
          Content provided by you to the Collective in connection with DeFiScan
          caused damage to, infringed upon, misappropriated or otherwise
          violated the rights (including intellectual property rights) of any
          third party. The Collective reserves the right to assume the exclusive
          defense and control of any matter otherwise subject to indemnification
          by you, in which event you will, at your own expense, fully cooperate
          with the Collective in asserting any available defenders and in the
          conduct of such defense.
        </p>
      </div>

      <h1 className="inline-block mt-10  tracking-tight text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
        Prohibited use
      </h1>

      <div className="flex-1 mt-6 text-center text-muted-foreground lg:text-start xl:text-base">
        <p>
          In connection with your use of the DeFiScan, you agree that you will
          not and will not attempt to or assists others in doing or attempting
          to:
        </p>

        <ul className="mt-4 pl-5 list-disc list-outside">
          <li>Violate any law, statute or regulation;</li>
          <li>Defraud, mislead or similar the Collective or any other user;</li>
          <li>Provide false, inaccurate, or misleading information;</li>
          <li>Transmit or upload any virus or other malicious software;</li>
          <li>
            Attempt to gain unauthorized access to any part of DeFiScan or any
            property or assets of the Collective or any other user;
          </li>
          <li>
            Defame, harass, or violate the privacy, intellectual property rights
            or the public standing of the Collective or any other user;
          </li>
          <li>
            Upload, display or transmit any content that contains illegal
            material or copyrighted material to which you do not have the
            respective rights to;
          </li>
          <li>
            Use or introduce to DeFiScan any data mining, crawling, scraping,
            robot or similar automated or data gathering extraction method;
          </li>
          <li>Restrict or interfere with access or use of the DeFiScan</li>
        </ul>
      </div>

      <h1 className="inline-block mt-10  tracking-tight text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
        Limited license; intellectual property; community generated content and
        feedback
      </h1>

      <div className="flex-1 mt-6 text-center text-muted-foreground lg:text-start xl:text-base">
        <p>
          <strong>Limited license for User</strong>: Subject to these Terms and
          your full compliance therewith, you are granted a limited, personal,
          non-exclusive, non-commercial, non-sublicensable, at any time
          revocable by the Collective at its sole discretion and
          non-transferable license to use DeFiScan and the Content, in each case
          solely for your personal use and only in line with the limitations
          outlined in these Terms, particularly the Disclaimer above. You
          particularly agree not to use DeFiScan or the Content for any
          commercial purpose or as a basis for any (financial or non-financial)
          decisions to use, participate in, invest in or in any other way
          interact with any of the Protocols. Except for the foregoing license,
          you have no other rights to DeFiScan or any Content, and you may not
          modify, edit, copy, distribute, reproduce, publish, display, perform,
          license, sell, rent, lease, loan, create derivative works of, create
          any index, reverse engineer, alter, enhance, provide access to or in
          any way exploit DeFiScan or the Content in any manner.
        </p>

        <p className="mt-4">
          <strong>Intellectual property of the Collective</strong>: DeFiScan and the Content may
          involve works protected under applicable intellectual property
          legislation, particularly copyright legislation. Other than the
          limited license outlined above, the Collective (or, where applicable,
          third-parties) retain all rights, titles and interests to any of the
          intellectual property, including copyrights, trademarks, designs,
          domain names, know-how, trade secrets, data and other intangible
          property rights ("<strong>IP Rights</strong>") in any way related to
          DeFiScan and nothing in these Terms or the wider communication of the
          Collective with respect to the DeFiScan should be understood as an assignment of any IP Rights
          or any license other than what is outlined in the section above to any User.
        </p>

        <p className="mt-4">
          <strong>User Generated Content; assignment of rights to the Collective</strong>: Users, including
          Protocols, may make feedback and other content generated by such Users (particularly including
          Reviews, collectively such content the "<strong>User Generated Content</strong>") available to the Collective,
          to be used by the Collective directly on the Website or to be integrated as part of the Content.
          By submitting or in any way making available User Generated Content to the Collective, the respective User thereby
          irrevocably assigns and transfers to the Collective all right, title and interest, whether or not protected by intellectual
          property legislation such as copyright laws, relating to the User Generated Content, in particular with respect to any software, source code,
          tools, documentation, know-how, databases, inventions, processes, overviews and similar, free of charge unless explicitly specified
          otherwise by the Collective. This assignment of rights includes all assignable rights, including the right to first-time publication, application,
          distribution, amendment, and adaptation. It continues to apply without limitation after any termination or amendment of these Terms. The respective
          User warrants that the respective User is authorized to concede, assign, transfer and grant all rights stated in this clause and that no third party
          intellectual property rights will be infringed by any action considered herein. The respective User agrees to fully indemnify the Collective against 
          all damages, costs (including reasonable attorney fees) and third party claims arising from a breach of the aforementioned warranty. To the extent
          certain jurisdictions do not provide for the assignability of all rights stated in this clause, the respective User thereby grants the Collective
          a worldwide, irrevocable, exclsuive, transferable, sub-licensable, royalty-free, unlimited and unrestricted license to use, modify, develop and
          exploit such rights in any conceivable way and medium. To the extent not all rights stated in this clause can be assigned or licensed to the Collective 
          due to mandatory legal provisions, the respective User thereby waives all such non-assignable rights for an indefinite term, to the extent permitted
          by applicable law. The respective User furthermore agrees that the Collective is entitled to pursue any registration necessary to secure all rights
          in this clause, and the respective User, where necessary, agrees to assist the Collective in such registration as needed. If the respective User is
          unable to assist as needed, the respective User hereby irrevocably appoints the Collective as his/her agent to act for and on his/her behalf to execute any 
          such registration and provide any such signatures as needed and as permitted under applicable law.
        </p>
      </div>

      <h1 className="inline-block mt-10  tracking-tight text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
        Supporting the Collective
      </h1>

      <div className="flex-1 mt-6 text-center text-muted-foreground lg:text-start xl:text-base">
        <p>
          There are numerous ways in which you can support the Collective.
          Please refer to our Website and our Donation Terms or reach out
          directly to the Collective at{" "}
          <a href="mailto:hello@deficollective.org">hello@deficollective.org</a>{" "}
          or on Discord.
        </p>
      </div>

      <h1 className="inline-block mt-10  tracking-tight text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
        Miscellaneous
      </h1>

      <div className="flex-1 mt-6 text-center text-muted-foreground lg:text-start xl:text-base">
        <p>
          <strong>Privacy policy</strong>: The Collective is committed to
          maintain to protecting your personal information and helping you
          understand exactly how your personal information is being used. Please
          refer to our Privacy Policy - which also applies in connection with
          DeFiScan - for more details.
        </p>

        <p className="mt-4">
          <strong>Third party links and content: </strong>DeFiScan may contain
          links to third-party websites as well as third-party content. Your use
          of such third-party websites or contents is entirely at your own risk.
          The Collective does not monitor or have control over, and makes no
          representations or warranties regarding third-party websites or
          third-party content. Any such links or content are provided as
          convenience only and are not an endorsement, adoption, sponsorship,
          affiliation with or similar.
        </p>

        <p className="mt-4">
          <strong>
            Modification, suspension or discontinuance of DeFiScan:{" "}
          </strong>
          At any time and in the Collective's sole and absolute discretion, the
          Collective may modify, suspend or discontinue DeFiScan or any of the
          Content without prior notice, for any reason whatsoever and without
          any liability whatsoever to you or any third-party.
        </p>

        <p className="mt-4">
          <strong>Changes to Terms: </strong>The Collective may, at any time and
          in its sole and absolute discretion, make changes to these Terms
          without prior notification. Changes become effective immediately.
        </p>

        <p className="mt-4">
          <strong>Entire agreement</strong>: These Terms constitute the entire
          agreement between you and the Collective with respect to the subject
          matter thereof and supersede any prior agreement, if any.
        </p>

        <p className="mt-4">
          <strong>No assignment</strong>: You may not assign any of your rights,
          obligations or claims under these Terms.
        </p>

        <p className="mt-4">
          <strong>Severability</strong>: If any provision of these Terms (in
          whole or in part) is held to be illegal, invalid or otherwise
          unenforceable, the other provisions will remain in full force and
          effect and shall be understood and interpreted in light of the purpose
          of providing DeFiScan as a freely available public good to the DeFi
          industry.
        </p>

        <p className="mt-4">
          <strong>Governing law and jurisdiction</strong>: These Terms, and all
          claims arising out of or related to these Terms shall be governed by
          and construed in accordance with the substantive laws of Switzerland,
          excluding its conflict of law provision and the United Nations
          Convention for the International Sale of Goods (CISG). The ordinary
          courts at the seat of the Collective have exclusive jurisdiction.
        </p>

        <p className="mt-4">
          If you have questions, concerns or suggestions, please contact the
          Collective at{" "}
          <a href="mailto:hello@deficollective.org">hello@deficollective.org</a>{" "}
          or join the conversation on Discord.
        </p>
      </div>
    </div>
  );
}
