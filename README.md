# KDL Web Project

[![Build 11ty frontend](https://github.com/kingsdigitallab/kdl/actions/workflows/frontend.yml/badge.svg)](https://github.com/kingsdigitallab/kdl/actions/workflows/frontend.yml)
[![pages-build-deployment](https://github.com/kingsdigitallab/kdl/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/kingsdigitallab/kdl/actions/workflows/pages/pages-build-deployment)

## URLs

- [dev site:](https://kingsdigitallab.github.io/kdl/)

```text
https://kingsdigitallab.github.io/kdl/
```

- [live site:](https://kdl.kcl.ac.uk/)

```text
https://kdl.kcl.ac.uk/
```

## Architecture

This project is set up as a monorepo with PNPM workspaces. The website uses a static-first approach.

### Modules

This project is set up as a monorepo with:

#### Apps

- **[ETL](./apps/etl/readme.md)**: Fetches data from ClickUp transforms it to markdown files and JSON project index.
- **[Frontend](./apps/frontend/readme.md)**: Eleventy static site generator

#### Docs

Docs contains all the available content that get served by the frontend.

#### Packages

- **KDL components**: Nunjucks components

## Set up

### Dependencies

- [PNPM](https://pnpm.io/installation)
- [Node LTS](https://nodejs.org/)

> [!NOTE]
> It is recommended to [install Node](https://pnpm.io/cli/runtime#examples) with PNPM.

Clone the repo:

```bash
git clone git@github.com:kingsdigitallab/kdl.git
```

Install:

```bash
pnpm install
```

Run:

```bash
pnpm run dev
```

## Contributing

### Content updates

TBA

### Dev

#### Merge strategy

![merge strategy](./docs/assets/images/general/merge_strategy.png)

#### Data model

The data model is based on the [schema.org](https://schema.org/) vocabulary. Local customisations are prefixed with `KDL`.

```mermaid
erDiagram
    AGENT }o--o{ LINKROLE: url
    AGENT ||..o{ ORGANISATION: is
    AGENT ||..o{ PERSON: is
    AGENT }o--o{ KDLROLE: memberOf
    AGENT {
        string name
        string alternateName
        string description

    }

    ORGANISATION ||--o| ORGANISATION: parentOrganisation
    ORGANISATION {
        date foundingDate
        date dissolutionDate
    }

    DEFINEDTERMSET ||--o{ DEFINEDTERM: hasDefinedTerm
    DEFINEDTERMSET ||--o{ LINKROLE: url
    DEFINEDTERMSET {
        string name
    }

    DEFINEDTERM ||--|| DEFINEDTERMSET: inDefinedTermSet
    DEFINEDTERM {
        string name
    }

    PROJECT ||--|| DEFINEDTERM: creativeWorkStatus
    PROJECT }o--o{ DEFINEDTERM: keywords
    PROJECT }o--o{ LINKROLE: url
    PROJECT ||--o{ ORGANISATION: department
    PROJECT }o--o{ AGENT: funder
    PROJECT }o--o{ KDLROLE: member
    PROJECT }o--o{ PROJECT: relatedTo
    PROJECT {
        string name
        string slug
        string alternateName
        date foundingDate
        date dissolutionDate
        text description
    }

    KDLROLE ||--|| AGENT: agent
    KDLROLE ||--|| ORGANISATION: inOrganisation
    KDLROLE ||--|| PROJECT: inProject
    KDLROLE {
        string name
        date startDate
        date endDate
    }

    LINKROLE {
        string name
        date startDate
        date endDate
        string url
    }

    WEBPAGE ||--|{ AGENT: author
    WEBPAGE }o--o{ AGENT: contributor
    WEBPAGE ||--o{ DEFINEDTERM: keywords
    WEBPAGE }o--o{ AGENT: about
    WEBPAGE }o--o{ PROJECT: about
    WEBPAGE ||--|| WEBPAGE: isPartOf
    WEBPAGE ||--o{ WEBPAGE: hasPart
    WEBPAGE {
        string name
        string slug
        string type
        text abstract
        text text
    }
```
