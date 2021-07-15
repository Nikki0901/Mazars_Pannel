import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";


function PaymentModal({
  addPaymentModal,
  readTerms,
}) {

  return (
    <div>
      <Modal isOpen={addPaymentModal} toggle={readTerms} size="lg" scrollable={true} >
        <ModalHeader toggle={readTerms}>GENERAL TERMS AND CONDITIONS</ModalHeader>
        <ModalBody>
          <p>
            These General Terms and Conditions form an integral part of the engagement letter issued to Name of the Customer (the “Client”) by Mazars
            Advisory LLP (“we” or the “Firm”)
          </p>

          <h5>1. Applicability</h5>
          <p>
            • These General Terms and Conditions are applicable to any provision of services to the Client by the Firm in accordance with the Engagement Letter.
          </p>
          <p>• The Firm will perform the services in accordance with the applicable standards of professional conduct.</p>
          <p>• The Firm shall provide the services to the Client as an independent entity and not as the Client’s employee, agent, partner or joint venture. Neither the Client nor the Firm has any right, power or authority to bind the other except as stated otherwise in the Engagement Letter.</p>

          <h5>2. Scope of Work/Services</h5>
          <p>It is understood and agreed that the Firm shall provide the services to the Client as set out in the Engagement Letter. Any variation/modification/amendments shall be in writing and duly executed by the authorised signatory of each Party.</p>

          <h5>3. Fees and Expenses</h5>
          <p>
            The Firm fees are based on the degree of skill involved, the seniority of the staff engaged, the time necessarily spent on the engagement and the nature of the engagement.
          </p>
          <p>
            The Firm’s fees are due for payment immediately on the submission of the relevant invoice.
          </p>

          <p>
            Invoices upon which payment is not received within seven (7) days of the submission date shall accrue a late payment charge of 2% per month.
          </p>

          <p>The Firm will charge the Client separately for travel expenses, photocopying charges, courier and delivery charges and all other out-of-pocket expenses reasonably incurred in connection with the engagement. International facsimile and telephone calls may be separately charged in accordance with the Firm’s current charging policy.</p>

          <p>The Firm’s fees are exclusive of taxes or similar charges and the Client shall be responsible for all taxes imposed on the services</p>


          <p>The Firm may charge additional professional fees if events beyond the Firm’s control (including the Client’s acts or omissions) affect the Firm's ability to perform the services as originally planned or if the Client asks the Firm to perform additional tasks or services. If the Firm is required by applicable law, legal process or government action to produce information or personnel as witnesses with respect to the engagement, the Client shall reimburse the Firm for any professional time and expenses (including reasonable external legal costs) incurred.</p>

          <h5>4. Term</h5>

          <p>The agreement will come into effect at the moment the Client confirms the Engagement Letter (either orally or in writing or electronically) or at the moment when the work is commenced.</p>
          <p>Unless terminated sooner in accordance with the terms of the Engagement Letter, the engagement shall terminate on the completion of the services.</p>
          <p>The engagement may be terminated by either party at any time, with or without cause, by giving written notice to the other party of not less than thirty (30) days before the effective date of termination; provided that, in the event of a termination for cause, the party in breach shall have the right to cure the breach within the notice period. Upon termination of the engagement, the Client will compensate the Firm under the terms of the Engagement Letter for the services performed and expenses incurred for the period to the effective date of termination.</p>
          <p>The Firm has the right, at its option, to suspend or terminate the provisions of services in the event that the Firm’s invoices are not paid within the contractually agreed period.</p>

          <h5>5. Client’s Responsibility</h5>

          <p>The Client shall promptly provide (or cause others to provide) to the Firm,  the information, resources and assistance (including access to records, systems, premises and people) that the Firm reasonably requires to perform the services and the Client has full authority to do so.</p>
          <p>All information provided by the Client or on the Client’s behalf (“Client Information”) shall to the extent possible be accurate and complete and the Client shall be responsible for any infringement of copyright or other third-party rights.</p>
          <p>The Firm may rely on the Client Information made available to the Firm and, unless the Firm expressly agrees otherwise, will have no responsibility to evaluate or verify it.</p>










          <h5> 6. Use of name</h5>


          <p>In connection with any literature of an advertising or similar nature, the Firm’s name shall not be used or quoted without the prior written permission of the Firm.</p>
          <p> The Firm may use the fact of its involvement with the Client in this engagement in its credentials, proposals and publicity material subject to applicable law and professional regulations. The Client agrees to such use and the Firm shall, on the Client’s specific request, share samples of such use.</p>





          <h5> 7. Independence</h5>




          <p> The Firm undertakes to comply with the relevant independence guidelines dictated by applicable national and international regulators at all times. In order to allow the Firm to comply with the relevant independence guidelines, the Client undertakes to inform the Firm timely, correctly and completely of the legal and control structure of the Client’s business or the group to which the Client belongs, all its financial and other interests and participations, as well as all its other alliances, financial or otherwise, in the broadest sense of the word.</p>




          <h5>8. Limitation of Liability</h5>

          <p>The Firm, its partners, directors, consultants, employees, agents, affiliates and other personnel are not liable for any damage that the Firm has received in connection with the engagement.</p>
          <p> For the purposes of this engagement  "damage" shall mean the aggregate of all losses or damages and costs suffered or incurred, directly or indirectly, by the Client  under or in connection with the engagement or its subject matter (as the same may be amended or varied) and any report prepared pursuant to it, including as a result of breach of contract, breach of statutory duty, tort (including negligence), or other act or omission by the Firm but excluding any such losses, damages or costs arising from the fraud or dishonesty of the Firm or in respect of liabilities which cannot lawfully be limited or excluded.</p>
          <p>It is agreed that, having regard to the Firm’s interest in limiting the personal liability and exposure to litigation of its personnel, the Client will not bring any claim in respect of any damage against any of the Firm’s personnel personally also.</p>






          <h5>9. Confidentiality</h5>

          <p>The Firm shall not disclose any confidential information which it obtains as a result of acting for the Client to any third party other than its affiliates, directors, partners, officers, employees, personnel, agents, experts, consultants or advisors on a "need to know" basis and who are bound by appropriate confidentiality and non-disclosure obligations.</p>
          <p>In the event that the Firm or its representatives are requested pursuant to, or required by, applicable law or regulation or by legal or administrative process  to disclose any Confidential Information, or where the Firm wishes to disclose its professional indemnity insurers or its advisers, the Firm agrees that it will, as far as is legally and practically possible, provide the Client with prompt notice of such request or requirement in order to enable the Client to seek an appropriate protective order or other remedy. In the event that such protective order or other remedy is not obtained, the Firm or its representatives, as the case may be, shall disclose only the portion of the Confidential Information which is legally or professionally required to be disclosed.</p>
          <p>The Firm shall be permitted to retain copies of such Confidential Information as it is required to retain for legal or professional regulatory purposes.</p>
          <p>Unless specifically governed by statute or regulation, the report and deliverables issued by the Firm in accordance with the Engagement Letter are strictly confidential and for use by the Client for the purpose specified in the Engagement Letter. The reports and other deliverables may not be used, reproduced or circulated for any other purpose, whether in whole or in part, without the Firm’s prior written consent, which consent shall only be given after full consideration of the circumstances at the time and on the understanding that the Firm owes no duty of care to any party other than the Client.</p>










          <h5>10. Electronic transmittals</h5>

          <p>During the course of our engagement, the Firm or the Client may need to electronically transmit confidential information to each other and to other entities engaged by either party.  E-mail is a fast and convenient way to communicate.  However, email is not a secure means of communication and, thus, confidentiality could be compromised.  The Client agrees to the use of e-mail and other electronic methods to transmit and receive information, including confidential information, between the Firm and the Client and between the Firm and outside specialists or other entities engaged by either the Firm or the Client.</p>

          <h5>11. Indemnification</h5>
          <p>The Client shall indemnify and hold harmless the Firm against all claims by third parties (contractual or in tort), threatened claims, suits, taxes, penalties, liabilities, damages, costs and expenses, suffered, incurred, arising or expended (“Claims”), directly or indirectly by reason of Firm’s performance under this engagement or from having performed any services to the Client, except in the event of fraud, gross negligence, or wilful misconduct on the part of the Firm.</p>
          <p> The indemnity obligations as set out above shall survive the termination or rescission for any reason of the contractual relationship between the Firm and the Client until the expiry of the relevant statute of limitation applicable to any claims.</p>







          <h5>12. Ownership of Books, Papers and Working Papers</h5>



          <p>All documents in whatever form, paper, electronic or otherwise such as (for example, but without being an exhaustive list) working papers, letters (including without limitation e-mails), memoranda, file notes of meetings and telephone calls, draft computations and returns etc. and copies of other original documents which the Firm creates or which the Firm receives either as principal or in the Firm’s right or as agent for the Client belong to the Firm. For the avoidance of doubt, the Firm does not assert such ownership rights to documents such as, for example, title documents, original invoices and other original primary accounting records, tax deduction certificates etc. belonging to the Client, but the Firm may retain possession of them by exercising a lien, if the Firm’s fees remain outstanding after becoming due for payment.</p>


          <h5>13. Intellectual Property Rights</h5>

          <p> The Firm may use data, software, designs, utilities, tools, models, systems and other methodologies and know-how (“Materials”) that the Firm owns or right to use in performing the services. Notwithstanding the delivery of any reports, the Firm retains all intellectual property rights in the Materials (including any improvements or knowledge developed while performing the services), and in any working papers compiled in connection with the services (but not Client Information reflected in them).</p>

          <h5>14. Anti-Corruption and Anti-Bribery</h5>

          <p>The Firm and the Client shall each maintain in place throughout the term of this Engagement Letter its own policies and procedures, including, but not limited to, adequate procedures to ensure compliance with applicable Anti-Corruption and Anti-Bribery Laws, and will enforce them as appropriate.</p>





          <h5>15. Money Laundering</h5>


          <p>The Firm and the Client shall each comply with applicable Money Laundering Regulations</p>

          <h5>16. Personal Data Collection</h5>

          <p>All personal data collected in the Client identification and verification process will only be used for the Client due diligence purpose (if necessary), for advising the Client on the Instructed Matter and for sending the Client details of other services that the Firm may from time to time offer including sending legal updates, seminar invitations and other marketing material. If the Firm intends to use the Client’s personal data for any other unrelated purposes, the Firm shall seek the Client’s permission before doing so.</p>


          <h5>17. Non-exclusivity</h5>


          <p>The parties acknowledge that the Firm shall have the right to provide consulting or other professional services of any kind or nature whatsoever to any person or entity as the Firm in its sole discretion deems appropriate.</p>





          <h5>18. Non-solicitation</h5>


          <p> Each party undertakes during the effective term of this engagement and for a period of 1 (one) year thereafter, not to solicit, hire or employ directly or indirectly any partner, director, personnel or employee of the other party who has had any involvement in the engagement except with the prior written consent of the other party. If such consent is given a fee of 15% of the individual’s annual total compensation (cost to company) shall be payable to the other party.</p>



          <h5>19. Complaints</h5>


          <p></p>
          <p>The Firm must be notified in writing of complaints relating to the work carried out and/or the invoiced amount within 30 days of the date of dispatch of the documents or information in respect of which the Client is filing a complaint, or within 30 days of the discovery of the shortcoming, if the Client proves that the shortcoming could not have reasonably been discovered previously. However this does not exempt the Client from its obligation to pay the Firm’s invoices.</p>
          <p>If the Firm accepts the complaint then, it has the option of adjusting the fee charged, having the rejected work rectified or terminating the Contract (for remaining work).</p>




          <h5>20. Force Majeure</h5>


          <p> Neither the Client nor the Firm shall be liable for breach of any terms and conditions set out in the Engagement Letter (other than payment obligations) caused by circumstances beyond the reasonable control of the Client or the Firm.</p>


          <h5>21. Notice</h5>
          <p>Any notices, demands or consents required or permitted in accordance with the Engagement Letter and these General Terms and Conditions shall be in writing and signed by an authorised officer of the relevant party and shall be delivered either personally or sent by registered post or receipted courier addressed to the respective Party’s address as stated in the Engagement Letter.</p>


          <h5>22. Variation</h5>

          Variations to any of the provisions of the Engagement Letter and the General Terms and Conditions shall be void unless they are in writing and duly executed by the authorised representatives of each party.

          <h5>23. Severability</h5>

          <p>If any term of the Engagement Letter or General Terms and Conditions is held to be invalid or unenforceable by any judicial, applicable law, professional regulations or other competent authority but would be valid or enforceable if some parts of the term were modified or deleted, the term in question will apply with the minimum modification or deletion necessary to make it valid and enforceable, and the other provisions in the Engagement Letter and General Terms and Conditions will be unimpaired and remain in full force and effect.</p>
          <p>If any term of the Engagement Letter or General Terms and Conditions is not relevant or applicable for the particular engagement such terms shall be modified or deleted as necessary to make it valid and the other provisions in the Engagement Letter or General Terms and Conditions will be unimpaired and remain in full force and effect.</p>


          <h5>24. Contradictory Provisions</h5>
          <p> If these General Terms and Conditions and the Engagement Letter contain conflicting provisions, the provisions contained in the Engagement Letter shall prevail.</p>


          <h5> 25. Governing Law</h5>

          <p>This Engagement Letter and General Terms and Conditions will be governed by and construed in accordance with the laws of India and be subject to the exclusive jurisdiction of the courts of New Delhi.</p>
          <p>We acknowledge that the above is in accordance with our understanding of the arrangement.</p>





        </ModalBody>


        <ModalFooter>
          <Button color="secondary" onClick={readTerms}>Cancel</Button>
        </ModalFooter>

      </Modal>
    </div>
  );
}

export default PaymentModal;
