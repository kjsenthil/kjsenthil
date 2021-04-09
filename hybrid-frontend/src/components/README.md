# Components structure

## Atomic Design

The components are structured using the [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/) pattern:

1. **_Atoms_**: the smallest UI component that cannot be comprehensively divisible to a smaller component such as links, buttons, text-fields, typography, icons, avatar ...etc.

2. **_Molecules_**: A small combination of a couple or few atoms that form a generic-purpose component that may or may not be use an internal state, but at the same time agnostic of the app's business-specific features. A molecule can be a profile widget (contains avatar, card and typography atoms), a scrollable items list, a radio button group, a form field with label and error/validaiton messages ...etc.

3. **_Organisms_**: A more complex component comprised of molecules and atoms which forms a feature serveing a specific or generic purpose for the business such as: goals selection, tiles and action button, a login form, a header menu ..etc.

4. **_Templates_**: page-level objects that place components into a layout and articulate the design's underlying content structure. example: generic site layout with header menu, footer and floating chat widget. Could also be a template frame for a multi-page onboarding flow where navigating from one page to anthter is controlled by the wrapping template which tracks the progress of onboarding from global context.

5. **_Pages_**: These are the actual pages that are distinct instances of templates; the glue for all sorts of components, and the point at which API calls are made, and reads/writes to global state.

6. **_Particles_**: This is where we can have components that do not have any observable UI presentation, but rather provide a functionality that wraps other atoms, molecules, organisms, templates and even pages for purposes such as injecting props or show/hide (toggle) a component. This is a custom folder is not part of the Atomic Design system. Examples: `FeatureToggle` & `CustomThemeProvider`.

### Direction of dependency:

#### Components dependency:

Atomic Design requires one direction of dependency:

`pages -> templates -> organisms -> molecules -> atoms (-> particles)`

Parent components like pages can skip some children:

- A page may not depend on a template, but it can (and ideally should mainly) depend on organisms. But it can also depend on molecules and even individual atoms.

- Templates should never depend on pages, but it can depend on organisms, molecules and atoms (and particles).

- Organisms can only depend on molecules and/or atoms (and particles).

- Molecules can only depend on atoms, and depending on what particle components we may have, still better keep molecules independent of any particles.

- Atoms and Particles should be pure of any dependency.

#### Data dependency:

An Atomic Design system is a solution for pure UI components. That means the components folder should be easily extractable into a standalone lib (as part of a mono-repo packages with workspaces or a publishable npm package). That would at least consist of all atoms & molecules, and some organisms & templates. For example, a transaction list is a sufficiently generic organism to be shared even with other types of apps, and a header, body, footer layout is a sufficiently generic template if multiple distinct apps are meant to follow the same design.

That said, it leaves pages which are pretty much app-specific as the most custom and least abstract components that can safely call apis or make graphQL queries, or import local config data / images. It would then be the job of pages to pass all the data props down to the children.

## Material UI

The current implementation of the design components depend on [material-ui](https://material-ui.com/) react component library. This library provides an out-of-the-box solution for many customizable `atoms` such as `Button`, `TextFields`, `Switch`, icons ...etc. and some `molecules` such as `Alert`, `Autocomplete`, `DataGrid`, `Pagination`...etc.

While this library already provides most of the atoms and some of the molecules that DH needs, we still would want to maintain an atomic design structure in tandem to material-ui, but also as a way to encapsulate this dependency in the following way:

1. All material-ui atoms and molecules that we use out of the box without customization must be re-exported via atoms and molecules folders at the `index.ts`. Then whenever an organism, a template or a page requires an atom or molecule, the material-ui component should be imported via `./atoms` and `./molecules`.
2. This will reduce the dependency on the library in such events where:
   2.1. we need a custom atom/molecule that would wrap an original `material-ui`, then this wrapping component can be exported with the same name as the component's name from `material-ui` without having to change organisms, templates or pages
   2.2. we need to completely replace some components partly, reducing the depenedency on material-ui while maintaining the component's name
   2.3. a full rebranding is required and a fundamentally different theming strategy is needed that renders the use of an external library redundant. Hence, the refactoring will simply be confined to a couple of folders.
