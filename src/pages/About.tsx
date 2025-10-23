[plugin:vite:react-babel] /home/project/src/pages/Events.tsx: Unexpected token, expected "}" (115:41)

  113 |                 <ProfileItem icon={Smile} label="Nickname" value="Ragga" />
  114 |                 <ProfileItem icon={Flag} label="Nationality" value="Ghanaian" />
> 115 |                 <ProfileItem icon={Design
      |                                          ^
/home/project/src/pages/Events.tsx:115:41
    at constructor (file:///home/project/node_modules/@babel/parser/lib/index.js#cjs:362:19)
    at TypeScriptParserMixin.raise (file:///home/project/node_modules/@babel/parser/lib/index.js#cjs:3259:19)
    at TypeScriptParserMixin.unexpected (file:///home/project/node_modules/@babel/parser/lib/index.js#cjs:3279:16)
    at TypeScriptParserMixin.expect (file:///home/project/node_modules/@babel/parser/lib/index.js#cjs:3589:12)
    at TypeScriptParserMixin.jsxParseExpressionContainer (file:///home/project/node_modules/@babel/parser/lib/index.js#cjs:6684:10)
    at TypeScriptParserMixin.jsxParseAttributeValue (file:///home/project/node_modules/@babel/parser/lib/index.js#cjs:6651:21)
    at TypeScriptParserMixin.jsxParseAttribute (file:///home/project/node_modules/@babel/parser/lib/index.js#cjs:6700:38)
    at TypeScriptParserMixin.jsxParseOpeningElementAfterName (file:///home/project/node_modules/@babel/parser/lib/index.js#cjs:6714:28)
    at TypeScriptParserMixin.jsxParseOpeningElementAfterName (file:///home/project/node_modules/@babel/parser/lib/index.js#cjs:9690:18)
    at TypeScriptParserMixin.jsxParseOpeningElementAt (file:///home/project/node_modules/@babel/parser/lib/index.js#cjs:6709:17
Click outside, press Esc key, or fix the code to dismiss.
You can also disable this overlay by setting server.hmr.overlay to false in vite.config.ts.