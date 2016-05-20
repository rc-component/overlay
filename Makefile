
dev:
	@chrome http://localhost:9010
	@npm run storybook

publish:
	@json -e 'var v = this.version; var n = parseInt(v.match(/\.(\d+)$$/)[1]); n++ ; this.version = v.replace(/\.\d+$$/, "." + n)' -f package.json -I

.PHONY: dev
