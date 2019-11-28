module.exports = {
    plugins: [
        'stylelint-selector-bem-pattern',
    ],
    rules: {
        'at-rule-name-case'                                : 'lower',
        'at-rule-name-space-after'                         : 'always',
        'at-rule-semicolon-newline-after'                  : 'always',
        'block-closing-brace-newline-after'                : 'always',
        'block-closing-brace-newline-before'               : 'always',
        'block-no-empty'                                   : true,
        'block-opening-brace-newline-after'                : 'always',
        'block-opening-brace-space-before'                 : 'always',
        'color-hex-case'                                   : 'lower',
        'color-named'                                      : 'never',
        'color-no-invalid-hex'                             : true,
        'declaration-bang-space-after'                     : 'never',
        'declaration-bang-space-before'                    : 'always',
        'declaration-block-no-duplicate-properties'        : [true, { ignore: ['consecutive-duplicates'] }],
        'declaration-block-no-shorthand-property-overrides': true,
        'declaration-block-semicolon-newline-after'        : 'always',
        'declaration-block-semicolon-newline-before'       : 'never-multi-line',
        'declaration-block-semicolon-space-after'          : 'always-single-line',
        'declaration-block-semicolon-space-before'         : 'never',
        'declaration-block-trailing-semicolon'             : 'always',
        'declaration-colon-space-after'                    : 'always',
        'declaration-colon-space-before'                   : 'never',
        'font-family-name-quotes'                          : 'always-unless-keyword',
        'function-calc-no-unspaced-operator'               : true,
        'function-comma-space-after'                       : 'always',
        'function-comma-space-before'                      : 'never',
        'function-name-case'                               : 'lower',
        'function-parentheses-space-inside'                : 'never',
        'function-url-quotes'                              : 'always',
        'indentation'                                      : 4,
        'max-empty-lines'                                  : 1,
        'media-feature-colon-space-after'                  : 'always',
        'media-feature-colon-space-before'                 : 'never',
        'media-feature-range-operator-space-after'         : 'always',
        'media-feature-range-operator-space-before'        : 'always',
        'media-query-list-comma-newline-after'             : 'never-multi-line',
        'media-query-list-comma-newline-before'            : 'never-multi-line',
        'media-query-list-comma-space-after'               : 'always',
        'media-query-list-comma-space-before'              : 'never',
        'no-duplicate-selectors'                           : true,
        'no-eol-whitespace'                                : true,
        'no-extra-semicolons'                              : true,
        'no-invalid-double-slash-comments'                 : true,
        'number-leading-zero'                              : 'always',
        'number-max-precision'                             : 3,
        'number-no-trailing-zeros'                         : true,
        'property-case'                                    : 'lower',
        'rule-empty-line-before'                           : ['always', { ignore: ['after-comment'], except: ['inside-block-and-after-rule', 'first-nested'] }],
        'selector-attribute-brackets-space-inside'         : 'never',
        'selector-attribute-operator-space-after'          : 'never',
        'selector-attribute-operator-space-before'         : 'never',
        'selector-class-pattern'                           : null,
        'selector-combinator-space-after'                  : 'always',
        'selector-combinator-space-before'                 : 'always',
        'selector-list-comma-newline-after'                : 'never-multi-line',
        'selector-list-comma-newline-before'               : 'never-multi-line',
        'selector-list-comma-space-after'                  : 'always',
        'selector-list-comma-space-before'                 : 'never',
        'selector-max-empty-lines'                         : 0,
        'selector-pseudo-class-case'                       : 'lower',
        'selector-pseudo-class-no-unknown'                 : true,
        'selector-pseudo-class-parentheses-space-inside'   : 'never',
        'selector-pseudo-element-case'                     : 'lower',
        'selector-pseudo-element-colon-notation'           : 'single',
        'selector-pseudo-element-no-unknown'               : true,
        'selector-type-case'                               : 'lower',
        'selector-type-no-unknown'                         : [true, { ignoreTypes: ['from', 'to', '0%', '50%', '100%', '_'] }],
        'shorthand-property-no-redundant-values'           : true,
        'string-no-newline'                                : true,
        'string-quotes'                                    : 'single',
        'time-min-milliseconds'                            : 100,
        'unit-case'                                        : 'lower',
        'unit-whitelist'                                   : ['px', 'em', 'rem', '%', 'vw', 'vh', 'deg', 'ms', 's', 'fr'],
        'value-keyword-case'                               : 'lower',
        'value-list-comma-newline-after'                   : 'never-multi-line',
        'value-list-comma-newline-before'                  : 'never-multi-line',
        'value-list-comma-space-after'                     : 'always',
        'value-list-comma-space-before'                    : 'never',
    }
};
