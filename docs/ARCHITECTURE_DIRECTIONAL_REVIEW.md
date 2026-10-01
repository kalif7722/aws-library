# Directional architecture review

The table-like learning stages and destination lists are removed from the shared renderer. The compact service cards and directional arrows follow the existing AWS Budgets and Cost Explorer presentation. Desktop diagrams keep the path in a compact scrollable view; narrow screens arrange the stages vertically with downward arrows. The renderer retains every node and its hover explanation, without drawing crossing paths across the entire diagram or stretching a single service card across the page.

This presentation correction applies to the AWS, Azure and GCP shared renderer paths. Existing flow-specific explanations and the previous 35 content expansions are retained. It does not impose a four-node limit or add services solely to increase node count.

## First focused corrections

- **Amazon Inspector:** build candidate → ECR candidate digest → Inspector finding → owner-approved dependency repair and rebuild → replacement digest assessment → release gate and ECS rollout. Unrelated portal, CDN, customer identity and order-store context is removed. Hover details explain exactly who builds, scans, repairs, approves and deploys the artifact.
- **VPC Reachability Analyzer:** failed EC2 database connection → operator-selected supported path → configuration analysis → specific database security-group barrier and approved repair → live authenticated RDS query. The analysis remains separate from packet traffic and database execution. Unrelated load-balancer and corporate-client branches are removed.

AWS Budgets and Cost Explorer are retained as the content and presentation reference. Further individual service corrections should use a concrete task, relevant dependencies, a readable main path and necessary decision/failure branches; extra application context should not be grafted onto every service.

## Verification and remaining scope

The production build and 32 focused tests pass, including rendering every node and hover detail across all 203 reviewed workflows. The two focused replacements have eight and seven nodes respectively. The other catalog entries are not newly certified as semantically reviewed by this renderer change. The existing completed/pending inventory remains authoritative.

Local browser preview access remains blocked; no screenshot-based visual audit is claimed.
