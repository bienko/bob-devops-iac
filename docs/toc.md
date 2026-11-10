<!-- toc-page -->
<style>
  /* Hide the ToC on its own standalone site page (screen), but keep it
     visible inside the combined print page (#print-site-page) so it can
     render into the PDF. Never touches .md-main__inner or the site chrome. */
  @media screen {
    .toc-page { display: none; }
    #print-site-page .toc-page { display: block; }
  }
  /* Keep the ToC's own group headers flowing on one page in print,
     without re-paginating h2 headings anywhere else in the document. */
  @media print {
    .toc-page h2 { page-break-before: auto !important; }
  }
</style>

<div class="toc-page" markdown>

# **Table of Contents**

## [Introduction](index.md)

- [1. "Infrastructure as code" paradigm for modern platforms](index.md#i-infrastructure-as-code-paradigm-for-modern-platforms)
- [2. What is IBM Bob?](index.md#ii-what-is-ibm-bob)
- [3. Environment: the web platform](index.md#iii-environment-the-web-platform)
- [4. Architecture](index.md#iv-architecture)
- [5. The lab journey](index.md#v-the-lab-journey)
- [6. What you will build](index.md#vi-what-you-will-build)
- [7. Next steps](index.md#vii-next-steps)

## [Registration and Setup](setup.md)

- [1. What you will configure](setup.md#i-what-you-will-configure)
- [2. Reserving the server](setup.md#ii-reserving-the-server)
- [3. Software configuration](setup.md#iii-software-configuration)
- [4. Workspace configuration](setup.md#iv-workspace-configuration)
- [5. Connecting to the server](setup.md#v-connecting-to-the-server)
- [6. Troubleshooting](setup.md#vi-troubleshooting)
- [7. Ready to proceed](setup.md#vii-ready-to-proceed)

## [Design - Architecture and Planning](1-1.md)

- [1. What you will design](1-1.md#i-what-you-will-design)
- [2. Step A: Understand the goal and sketch the architecture](1-1.md#ii-step-a-understand-the-goal-and-sketch-the-architecture)
- [3. Step B: Generate the Terraform layer](1-1.md#iii-step-b-generate-the-terraform-layer)
- [4. Step C: Generate the Ansible layer](1-1.md#iv-step-c-generate-the-ansible-layer)
- [5. Step D: Security & secrets review](1-1.md#v-step-d-security-secrets-review)
- [6. Review & approval](1-1.md#vi-review-approval)
- [7. Key takeaways](1-1.md#vii-key-takeaways)

## [Design - Validation and Enhancement](1-2.md)

- [1. What you will validate and add](1-2.md#i-what-you-will-validate-and-add)
- [2. Step E: Idempotency, lint, and drift audit](1-2.md#ii-step-e-idempotency-lint-and-drift-audit)
- [3. Step F: Add the observability stack](1-2.md#iii-step-f-add-the-observability-stack)
- [4. Step G: Disaster recovery and rollback](1-2.md#iv-step-g-disaster-recovery-and-rollback)
- [5. Step H: CI/CD pipeline integration](1-2.md#v-step-h-cicd-pipeline-integration)
- [6. What you just built](1-2.md#vi-what-you-just-built)
- [7. Key takeaways](1-2.md#vii-key-takeaways)

## [Deploy - Automated Deployment](2-1.md)

- [1. What you will deploy](2-1.md#i-what-you-will-deploy)
- [2. Pre-flight checks](2-1.md#ii-pre-flight-checks)
- [3. Opening Bob Shell](2-1.md#iii-opening-bob-shell)
- [4. The deployment prompt](2-1.md#iv-the-deployment-prompt)
- [5. Expected output shape](2-1.md#v-expected-output-shape)
- [6. If the run fails](2-1.md#vi-if-the-run-fails)
- [7. Key takeaways](2-1.md#vii-key-takeaways)

## [Deploy - Testing and Troubleshooting](2-2.md)

- [1. What you will verify](2-2.md#i-what-you-will-verify)
- [2. What Bob validated](2-2.md#ii-what-bob-validated)
- [3. Validating the platform](2-2.md#iii-validating-the-platform)
- [4. Tearing down the tunnel](2-2.md#iv-tearing-down-the-tunnel)
- [5. Key takeaways](2-2.md#v-key-takeaways)

## [Operate - Monitoring and Observability](3-1.md)

- [1. What you will observe](3-1.md#i-what-you-will-observe)
- [2. Opening the interfaces](3-1.md#ii-opening-the-interfaces)
- [3. How the pieces fit](3-1.md#iii-how-the-pieces-fit)
- [4. The pre-provisioned dashboard](3-1.md#iv-the-pre-provisioned-dashboard)
- [5. Generating traffic](3-1.md#v-generating-traffic)
- [6. Querying Prometheus directly](3-1.md#vi-querying-prometheus-directly)
- [7. Querying logs in Grafana Explore](3-1.md#vii-querying-logs-in-grafana-explore)
- [8. What persists](3-1.md#viii-what-persists)
- [9. Key takeaways](3-1.md#ix-key-takeaways)

## [Operate - Self-Healing and Recovery](3-2.md)

- [1. What you will demonstrate](3-2.md#i-what-you-will-demonstrate)
- [2. Why a naive crash demo fails](3-2.md#ii-why-a-naive-crash-demo-fails)
- [3. Running the demo](3-2.md#iii-running-the-demo)
- [4. Recovery procedures](3-2.md#iv-recovery-procedures)
- [5. Key takeaways](3-2.md#v-key-takeaways)
- [6. Earn accreditation](3-2.md#vi-earn-accreditation)

## [Reference - Platform Architecture](architecture.md)

- [1. Purpose of this reference](architecture.md#i-purpose-of-this-reference)
- [2. High-level architecture](architecture.md#ii-high-level-architecture)
- [3. Design principles](architecture.md#iii-design-principles)
- [4. Component details](architecture.md#iv-component-details)
- [5. Network architecture](architecture.md#v-network-architecture)
- [6. Data flow](architecture.md#vi-data-flow)
- [7. Storage architecture](architecture.md#vii-storage-architecture)
- [8. Security architecture](architecture.md#viii-security-architecture)
- [9. Scalability considerations](architecture.md#ix-scalability-considerations)
- [10. Disaster recovery](architecture.md#x-disaster-recovery)
- [11. Operational procedures](architecture.md#xi-operational-procedures)
- [12. Technology stack](architecture.md#xii-technology-stack)
- [13. Glossary](architecture.md#xiii-glossary)

</div>