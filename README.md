# word_roots

A web application that helps you invent **scientific names** (for example, species epithets or compound names) by turning a **plain-language description** of the organism into suggested **Latin and Greek combining forms**, then assembling them into coherent candidates.

The goal is to support the same audience Borror had in mind—students, clinicians, and especially **taxonomists** who need to coin names that follow conventional patterns for word formation.

## Source material

The project is built around *Dictionary of Word Roots and Combining Forms* by **Donald J. Borror** (Mayfield Publishing Company; first edition 1960), compiled from Greek, Latin, and other languages with emphasis on biological terminology and scientific naming.

A PDF of that dictionary is included in this repository as the working source for analysis and tooling:

- `dictionary_of_word_roots_and_combining_forms_borror.pdf`

The printed book also contains sections on **formulation of scientific names**, **transliteration of Greek words**, and **common combining forms**—those sections will inform how the app validates and combines roots.

## Planned application

1. **Ingest and structure** the dictionary (roots, meanings, languages, combining forms, and cross-references).
2. **Map natural language** (e.g. “small forest-dwelling frog with bright eyes”) to relevant roots and affixes using the structured lexicon and, where helpful, lightweight semantics or search.
3. **Propose names** by combining forms according to common biological naming conventions (gender agreement, linking vowels, hyphenation rules where applicable, etc.), with explanations so you can refine the result.

Implementation details (stack, hosting, and data handling) will be decided as the project grows.

## Repository layout

For now this repository contains only this README and the source PDF. Application code, extracted data, and tests will be added in later commits.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE) (GPL-3.0).
