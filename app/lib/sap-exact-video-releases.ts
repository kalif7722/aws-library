import published from "./sap-verified-video-registry.json";
export const COURSE_MEDIA_ORIGIN="https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev";
export const SAP_MEDIA_ROOT=COURSE_MEDIA_ORIGIN+"/aws-course-videos/previews/sap";

type ExactRelease={release:string;revision:string};

// Only releases with immutable artifacts verified in storage. Confirm ordinary
// learner media access before deploying changes to this list.
const EXACT_RELEASES:Readonly<Record<string,ExactRelease>>={
  "02/05":{release:"2026-11-20-m02p05-fresh-animation-v1",revision:"2026-11-20-m02p05-fresh-animation-v1"},
  "03/01":{release:"2026-11-20-m03p01-approved-animation-v1",revision:"2026-11-20-m03p01-approved-animation-v1"},
  "03/04":{release:"2026-11-20-m03p04-approved-animation-v1",revision:"2026-11-20-m03p04-approved-animation-v1"},
  "03/06":{release:"2026-11-20-m03p06-approved-animation-v1",revision:"2026-11-20-m03p06-approved-animation-v1"},
  "03/08":{release:"2026-11-21-m03p08-approved-animation-v1",revision:"2026-11-21-m03p08-approved-animation-v1"},
};

// Only activate a direct key after checking actual stored and learner-visible bytes.
export const DIRECT_SAP_REVISION="2026-11-23-sap-through-m08-v1";
export type DirectSapPin={
 manifestSha:string; manifestBytes:number; mediaSha:string; mediaBytes:number;
 mediaETag:string; vttSha:string; transcriptSha:string; posterUrl?:string;
};
const DIRECT_SAP_PINS:Readonly<Record<string,DirectSapPin>>={
  "00/01":{"manifestSha":"5c897675d1e507e2aae505b7c7ffdfbb914c48dc5c5896f8b8cda2c3b5b9aab6","manifestBytes":2412,"mediaSha":"154170cd10eebdd00f609912198b441cd52fae55c56b99717a8e2cdfd4e3dc61","mediaBytes":26992376,"vttSha":"3fd76a76d52204091915b9667c7503b7b9748917bae5e085efac534391a7e63b","transcriptSha":"78f488fc4eb050fe623385e0229fa87ca1a3b3bdefa1a3efa3d6d2094f5d1c54","posterUrl":"/course-visuals/sap-c03/module-00/slide-01.webp?v=sap-m00-cover-v2","mediaETag":"\"2b7917d65e6857409ff82031eab6667b\""},
  "01/01":{"manifestSha":"74ad998214bbdaa3af4147177539ddacaae750370e83f55030f4f1c44f9c201d","manifestBytes":1934,"mediaSha":"7d3e685e9ee2c2adb133957c6c72c4a316aa5307d90e3ffe636e8a1f2496634d","mediaBytes":16434082,"vttSha":"96eeefd68c8677cbfaa6fe89bd6320580f2405e1654a51f966ecb7d487554ed5","transcriptSha":"f852600e3981c1c1f5289b8ca11083c386a6949f465883768ac62f279032f769","mediaETag":"\"88ba18e3053128540845ce7ad8d391d8\""},
  "01/02":{"manifestSha":"5a57f232e0b33406dba06ec2faceeeabd10b2269cb2ea21eeea8c6b338f7ab17","manifestBytes":1933,"mediaSha":"264f7435a021de874402c06e5ee25d38600213adf555aa18d57b284f6733ea24","mediaBytes":15219436,"vttSha":"29f3b019c9ea0c6e0648c62390337df23c2cfd18cbdd940ba2322508e7b9ca1d","transcriptSha":"a14c402af665d7f32800d96c8561cb24c1fdb5a3bb899b78a981df7763a92140","mediaETag":"\"5429501db8bf46a65ca381c94999c882\""},
  "01/03":{"manifestSha":"49331fecc8540d492eecbea47f7645c295a6175125f331c55eb43e5a82bd0833","manifestBytes":2292,"mediaSha":"a16d78f17ae52247408736da37482ec8ed8934f3e4cd12558db4034204646e8f","mediaBytes":21224225,"vttSha":"9ddadfebdc147f728bb5069e688983669344e4639f28660608651435710208f1","transcriptSha":"5610e971dd2b456acdfd272bddce462850878040ba90bc14cd18ef788ad17e2c","mediaETag":"\"6433df35d180564f781063f2030b6596\""},
  "01/07":{"manifestSha":"b67fceaac04d94b6afdd15c95444208f6f3f3289937095e6cd3d7605203464f5","manifestBytes":1875,"mediaSha":"2eca13d75fd2c202c90a3c106af4f198eeb42258e83d75d55ff4c9b78ee11252","mediaBytes":23032938,"vttSha":"6218640ca3782c761e31e36fe23ed5c5345a76331a3ccafbfe730d8cb5c399d7","transcriptSha":"0de64e48af0d0c22a3626ae7ce2d129dba79093a81e8c2b242bfbdc25ee4b946","mediaETag":"\"7b2a25cc3293177f5272dfdffe05e5b3\""},
  "01/11":{"manifestSha":"76045ba43ff70d7a3f577114bcbd0d84ad71a2037257b686a4a6ed863bcf6725","manifestBytes":858,"mediaSha":"9ae306fd219be605f42226bb44a78c28335b13279597d916df8fd96ff7803fbb","mediaBytes":3960223,"vttSha":"585992bcf66db8d34109be22877b7fe61a49d991445d5dfe1e7cb9ac254f9652","transcriptSha":"5395167d19cc24125f90a31790c845f4de753bb5ca060c8b704e86fc9bac7c3b","mediaETag":"\"ebad7ab420ee57af03f692f9cbdc2ebc\""},
  "01/12":{"manifestSha":"715e49978bcf9c3270735def1beeb00051b8c29c23d0da2e293f4c7eb525d007","manifestBytes":1711,"mediaSha":"df11a20ae9df47778c8717fa0f3f6360ee726cce4290d78ea552aa02292441a5","mediaBytes":16187878,"vttSha":"c03d098e320344f34f24122122b954db3df2c12b9e1f6efd762d95b46c210af9","transcriptSha":"5810d9e1a46e56c863ad0dab6470306dc6ad5d83a0e6f97ef543bef34a6080a4","mediaETag":"\"861440d6b5de1c5604067a0292cdafe8\""},
  "01/13":{"manifestSha":"9fa8028c84ef992e6b55e0fb2399e1f3676c74b2b1cfe9a6fe481e4ef0b5cc06","manifestBytes":2090,"mediaSha":"48101f326ac101ae89015c51b0d1ec1d826dde11e3d02072e589145ad214b2eb","mediaBytes":18346768,"vttSha":"19cd2656169dfcebbc2c27e772da1e0decbb78f7c5dcbab64a1f54a6ebf51b78","transcriptSha":"42b82156d0291feb0f393f733cf3f549fbc0899da1f990c3ee7464a24c937490","mediaETag":"\"984472c5cda72cf4c5146adb3f719abe\""},
  "02/03":{"manifestSha":"b8746eb770de284ed929b13278bf5e3d7257256e8c7337d47a70aeb7633eda7f","manifestBytes":2727,"mediaSha":"91917287ee945398fb1fe93422311c444068e719e59552f16ccf6af2b075319c","mediaBytes":32234547,"vttSha":"69c27e865c3ae4dcee7395bba7ecc80a43c26b3b877493f6cc4ac9005d46eb63","transcriptSha":"5d2518af47603368278c86801453102d103da7082336070bf1c1d0ea1026b420","mediaETag":"\"7ae4b9aea6bcf18bd8a187adeadc94cd\""},
  "02/05":{"manifestSha":"49c42c9c25540c8fe52096d19812cd04e1c71d3ed5ab171059dfc02387e60d12","manifestBytes":2776,"mediaSha":"d284290475f98eb6035f6d74ac609f910e29fc57f246f5fa3eae85f761b27c01","mediaBytes":29143821,"vttSha":"bf1d712c21cc2610bc217ec90a634fe41469f116b4dc67edba559243e85bccd2","transcriptSha":"9aea1e809fdc8793cdb7ed86d01c2c58ffa8ea3ff4b556865f8ecdae1614e72c","mediaETag":"\"ee9ee529234c2f0bc7b3406750664180\""},
  "02/06":{"manifestSha":"5b6ad5a350d8167912a48618e36a2a715f3e14441a5a5d161961eec73d2c4314","manifestBytes":2211,"mediaSha":"827666cb223b4c3fd0cfa386d52f29d66bc43f8070a0e7b53cc7e7c982ccd0e1","mediaBytes":17784268,"vttSha":"6cb3bac74c835446a152270580f33ab553c9e2d104945c868fd1c7db04163bbc","transcriptSha":"6bbbacd19fab5489831f1cc3a5705c434ef7662e54a8c88c045a15adbfa8580e","mediaETag":"\"bf97c7dc763b02b340f6ffb58a6c1bf8\""},
  "02/07":{"manifestSha":"f6f1bcfb626b4e6bc9bc4dded7098f15fae053dc874f9d443167f458b3cc0e83","manifestBytes":1636,"mediaSha":"6152196fa93cb6379ddd11b76c34ee29bfe9d767d720373479b8a3e05bb5381c","mediaBytes":12749556,"vttSha":"ce561d07ec9e78156aeff8e9a12b0585af60271894d775233cca76e4dd5e5459","transcriptSha":"fc13c4aa5ed8a0e782d4a73147e7a41ebd74f7bcd7a2594d91621d456fffe164","mediaETag":"\"f1101afdc8b783f50ff4bb9b93c08e76\""},
  "02/08":{"manifestSha":"8f957aaf5c1c726667fb8224347b3aa13fbb6a589cb9e527f2c472c79827963e","manifestBytes":1788,"mediaSha":"b8be1da4a307282a263878b313740e179cccc538551c4630944926cda1cb4564","mediaBytes":10046517,"vttSha":"43a037865f63890d21f3d7eb6bef253a3f8d99eac4bb132679c29032ba8249a9","transcriptSha":"195dadb14f466eb9f606879adb8723201bc81532c6263883041e7c624ae7aaa6","mediaETag":"\"f9f73839c2f6449c84b16088dc8c358e\""},
  "03/01":{"manifestSha":"37a42c06e35dc6d8aace6a7435657e6907ecacc69f03ed2ab79f2d77a9aa0e1c","manifestBytes":1513,"mediaSha":"afae5fc33e60bd891235fac2d807dd3fdb00c4a455c8e3cee699d3fe87f77b99","mediaBytes":11718961,"vttSha":"e43115fa34238e8ae20df3bc28b5101f5c311f077382a0bd20cd6a511dd4ba44","transcriptSha":"a0474c29db46797456840fce6f51eea8071edba3ff2848226923abde27704f86","mediaETag":"\"2860b880fcba405ad1bcd568e889e6ff\""},
  "03/02":{"manifestSha":"9ee61e427e9bdcdf89996ef539ab3a46116ca37493e14075730b3626c5e8b6a2","manifestBytes":1523,"mediaSha":"b9b6361e4ad2c422353aa18b405102c1beb431f77b057e3811e2819db9e78bc4","mediaBytes":12859487,"vttSha":"d5c35b22df7274b4562f148a5dc61b5f90804f2dc5f5870388f6e8d29875e5ff","transcriptSha":"289efbb35999ced6d1c76317d0fc5e82e967ae1fb132eccc2fbe7fd63fd6ac4a","mediaETag":"\"9db15dbf82fa5aaa81f3eb497024ac49\""},
  "03/03":{"manifestSha":"12d0e622ce8cb3de34fb0c10597f23d5b21222981de219bcd8aa407ee9427f2f","manifestBytes":1249,"mediaSha":"49da10310aa17ad2122b96190302f373b7c4cfc7a6d0f1c9aab99ab6372a956c","mediaBytes":9528317,"vttSha":"f0e36fc89e3115c8fb18d9f437f56034129b809cc4c2b2731878d62d0f6bc293","transcriptSha":"c350e4c32c6a7c1bb5e68b134e614c22d79bfc9e65f9aa4e210d05e6d14c9ac5","mediaETag":"\"fa54d9a3d089c56ceccf6803bacba7ec\""},
  "03/07":{"manifestSha":"c227d125eb0f4b8cacad6f511128c5ce3efa2f2cc0cf6af9614e1f7ab913cfc0","manifestBytes":1481,"mediaSha":"ed0bb533ac15413086ab0770b8870d0a12a8f7880c684fd8da14201f3104796f","mediaBytes":14367057,"vttSha":"dc220e1e9ea2ef31466616100de013d869a5f4fb43e25e76320e150cf7ca14fa","transcriptSha":"dc738f60c891112e47ee7467c57c53b3488532553c1503200fc68ee635565ff9","mediaETag":"\"1607d4add3405b464a11739d43680c9f\""},
  "03/09":{"manifestSha":"2d4d0e1ff42a75d4e0eae06af07b93e9ab2838fc4782efa1017a05ee622a4ef0","manifestBytes":1135,"mediaSha":"9a71d20bc6ef84141a5b347529392b59b1a8bc129b2b603abe401cbf91504ef0","mediaBytes":8027025,"vttSha":"e2c682daaf0925acb5d430e9e4b80e91ebdec7a58b4e3a9d938ca1efeb00eee9","transcriptSha":"4f99c50eb7b158f7b5771c5d54b597fa83d23e3e853c06186c6c0da65b7e9f96","mediaETag":"\"ccc82cff29edde4515bf8b8997ba5aa5\""},
  "03/10":{"manifestSha":"d8f921270cce0e8c8054f3495a60ed2bc3b51c28e83aff22d68e8e140c92ed01","manifestBytes":2140,"mediaSha":"751ee20a847925194e57301d5c36db2141084cbb5794ba736a17ac8f7b2a8d48","mediaBytes":15018778,"vttSha":"5ce3ee976c051f272a9e8baf8203d9e50abad6a13428b906591837637fb3d6a8","transcriptSha":"ba4c79bea42a005ad447b1c17730c7d74ef41a4ffe540801e4f48f25560d4d7c","mediaETag":"\"959ab7a20ebeda058f875d7404535b18\""},
  "03/11":{"manifestSha":"580859a7a808bbc687c63687550311127e2fe49dd6c3b54be70c7227821a1879","manifestBytes":1231,"mediaSha":"394aed9485c36d84c1416820ff3324dca4d4b7abd9648e6fd09552ca845a3600","mediaBytes":8222365,"vttSha":"ed0e98113b62cf3639ab2a7a1395d191cf92acc60224784d1b5b5295e46c98c3","transcriptSha":"0f19d0e442ce38c72477aa2f9c9b6961bc6e3e37aa67bec0989896f042d7d38e","mediaETag":"\"c296f1049708928d180953e86db26306\""},
  "04/01":{"manifestSha":"05f232536de3dc638b44ac2d568f947cf96f0ab030c1b8338ba21efdba64a60f","manifestBytes":1538,"mediaSha":"ff5f0540ce46bc223e3845c19d46c95b147a77940bad4c6e30ec8afc3732d0e5","mediaBytes":13030442,"vttSha":"ecb43ac130f15ecc037b4d45306576c1c4bb82e7ee3d78e0afc1cb1f27a871a6","transcriptSha":"a902c8857249651ab6c698454bc964cb288aed292de99a1bb08ec8679bb97f2b","mediaETag":"\"fb3d3af03dd0b805c79cfd100f1bebb1\""},
  "04/03":{"manifestSha":"13aae6bf232375393fbc97026874ab5c21cbda759af16ffc37f3bef4ba9ebfd8","manifestBytes":1211,"mediaSha":"0fabd3dec66d2c9def26b605f8ae226fe9b7c4387eec8e29be51952a80828f19","mediaBytes":8660401,"vttSha":"526674de61c0ba0d075b1957f973e1f78aca847b16b3b6121ddb74cf723e8d5b","transcriptSha":"f461c3cb323d69fbaf9a041a6533a0acc7914f90c548b1100d9769f464e2c830","mediaETag":"\"253fcb2547e77f3ee8b903e8ce0c34fe\""},
  "04/04":{"manifestSha":"964bcd2a7e2133c20afb59b70307f0450989a65a064fe008e4840643d5e82655","manifestBytes":1965,"mediaSha":"29d5d000a4457575696418b00196a75808097f11dfd16d9307361018b7ecbf37","mediaBytes":18173140,"vttSha":"4e7f18f9889daf68f3a49202e933aadb5990194eeba1c210591d71c86d9e12eb","transcriptSha":"87fa2fad00896daf6d00203ac32237feb876f720c641ecc44c8c3b88fe0b05da","mediaETag":"\"f27d2f665398de4f26e4587e9413df8b\""},
  "04/06":{"manifestSha":"e54eb166e92b761774296124fd8d157929ba64fdce5bf19eaa2ec4c5d8eb9ad8","manifestBytes":1905,"mediaSha":"b5d355c17ee796ee47c9e3dbcd7792765a63d3837df67a9c032f663ead182837","mediaBytes":19233817,"vttSha":"13861a41130b9a50d36e451aa833b19f3e1addd2cb8e44cb2731a4596ee028a2","transcriptSha":"0dd45c2db356af41a5fe78a4948e181c0c88b55d13da761ecaccd4e490c3c85c","mediaETag":"\"c872a6ffeb6303865e7f4f3b6f2e8e94\""},
  "04/14":{"manifestSha":"f3250d4408c858b15d501dce0436271de0cedf88bf6c712c3fa366356c387778","manifestBytes":1210,"mediaSha":"05ac4c8033b349f3e83b2f417823219fa4aff65c9fecd4e96772f472dee57440","mediaBytes":9504751,"vttSha":"9b59c7e9fa94fed0817c6568e36b7f4c10aafba7b14108bbb8e92c6115315e01","transcriptSha":"4eb665f95f646fcf9e6785aca2d03e7fd5f8f6237e2d7f10e5c91f4283801db4","mediaETag":"\"6d4cc3b637d479917526f0ef5585311f\""},
  "05/02":{"manifestSha":"b006e2a3e0758a16410eb5a8262b4c8a3fa60ae5bfaa84d86fa353e7cc9d1a9f","manifestBytes":1537,"mediaSha":"9ca178398b31db6c2865f40204fa9482f8ebb8c2647c5e4b55c5fe362fcf86da","mediaBytes":15767090,"vttSha":"5e21c84294aff883ee48cfda3d406aecff75a4a0178efd7e414c33190fa6dee1","transcriptSha":"df4f4a0676a2bb6b950dba731d82cfa26e98e22097c47d20ece114d4a8d28a3c","mediaETag":"\"01da68083a670c1693dbe17fa441de02\""},
  "05/08":{"manifestSha":"b3d3484527f793dd0a84a1e51320d49ce4fc57fda280edd90190d0f06f75dc44","manifestBytes":1570,"mediaSha":"1f2ad55e34f4181155540b95b79249f3c7f25e788271b6e76f678225ec0f13e7","mediaBytes":14382919,"vttSha":"50b5ef8a667ecb5afdcc77670155d1407f7c5780569a2c3c99195f50314afd41","transcriptSha":"63429dddc4ab513aa7fc03c2d3bca9e755c10c0c26940b8c34819c3b002db7e7","mediaETag":"\"1250950b3a5f3f0ce406283f0083595b\""},
  "06/03":{"manifestSha":"f95a7454e064903a8438ccbfa92e862033bee665342a049b7933c795d7abc0b9","manifestBytes":1985,"mediaSha":"e3dcf39ef0a35326842c0cff5b9468c7cf37d493ebdbd4f61cd601bc944199de","mediaBytes":18087872,"vttSha":"472640d59c9f8a6cc63543073a5dd44e60a0343304e66f0cf3f5611864f22b5b","transcriptSha":"44d49264c8c6c4d15fead073f533cdea57baac815daf79f63e3f30b782bee6e7","mediaETag":"\"ed7ef9848b07d5746650b5b3dc5155fd\""},
  "06/05":{"manifestSha":"19901cd466fb241a01a1600e642ddabfa197d22d668b401018e456e6be386faf","manifestBytes":1157,"mediaSha":"a57cabcbedb5cc42ffda6c4cedd7bb90be6a0b7f4178f0250a66655876a13cee","mediaBytes":8657422,"vttSha":"d4d0e18e0a46977398dc6c26aa02d437635d331fab092baa72348424d158a464","transcriptSha":"99012638b50eb84790390eb152e84b86c07cb3fbdbe4fcccb263a4b661b7a173","mediaETag":"\"e5941b4d2bab40dd5559ef2cb3b124db\""},
  "06/06":{"manifestSha":"e81deee2519b48fc1566bfd3b4cb4089ecfa90f4d5262bf59094c9ca5699a652","manifestBytes":1949,"mediaSha":"fb0c50c92b01668adedfae6279d386a625bb9230015781642ea4c8cc99bc5241","mediaBytes":18255791,"vttSha":"61f72bbb6e5f135312e4e8a8f25a022c14064ddc40231b2d7bb7f54b086d97f0","transcriptSha":"a32e78dea22cc82f3b1993f0326e7c2569a2213113c6dd4e08244483bc297483","mediaETag":"\"9617c6732282383f80665da5789f1cc6\""},
  "06/08":{"manifestSha":"5349e1697638ab15f20def37115b42807620f9fb8594e0eec8f9cd1c67048648","manifestBytes":1870,"mediaSha":"38cc3d63a7e7bea852417f3fb1032d15a4a546858ee06d26e2af2009f6b54834","mediaBytes":15489958,"vttSha":"a1137e1bcaca684fe59f437c0fdcc73eaa4bd9860dc50e4a692109af934bc549","transcriptSha":"b1e96db5cb7253379815539b9054a47bd0db04c1a7aec34b293040d82d8099ba","mediaETag":"\"0b37b5a6055696154aef87c3899e668f\""},
  "07/01":{"manifestSha":"c844705a744ed6b388708b2649db1fa3c67b3eac26e66e08d66835b52e474c3b","manifestBytes":1520,"mediaSha":"7c9cb1faafda31126d76f52bd009764fb9c2d6fbcd42eeee764dbdd7c4dc3a4a","mediaBytes":15511585,"vttSha":"9223cc0ed4df8293af707e2feb6ff842eea3b6885fc16fa5d2f76a72d23b1a8d","transcriptSha":"0fe32d412317e4e0f3ebc0efeef742437cfa572f1a9b9901038187bfd8e79ffe","mediaETag":"\"878060fbbe8a8ada6b59f0fff2302c02\""},
  "07/02":{"manifestSha":"01bf3503a1567bff97d0590e6021e81af48bc4f0a95385b842a9d5e7cce77e4f","manifestBytes":1542,"mediaSha":"2a024d36ee65accd71da7b5c74fed76f14be1d8b83e7f0876259e100fdb86936","mediaBytes":14044489,"vttSha":"0b3999eda91b59af9f6da7a3392a573b810a50c56e769716d6cf570fe754698e","transcriptSha":"b54d1bd7c0c8335dca0ad294767fd77536408146916150ff37364c6b94335fa9","mediaETag":"\"400671fec61c43bd52820c45525a3584\""},
  "07/03":{"manifestSha":"ea667e869d7f9f0753549876fac281e0416b87d3df909cd7f797ccef4b47ef68","manifestBytes":1490,"mediaSha":"0aab15e37af12aed676af6f75ec2745fdbacae83757f9767c367a5f6e8c8aa48","mediaBytes":16504201,"vttSha":"532f430bea0abd90e4a1896716eaa29042d30c94888ce0183f203c57c154799d","transcriptSha":"d78ab07b307a81c9e1e335d06014217b153f0f3cb56d20f4c78ddf2bfe93fb5a","mediaETag":"\"70d34e918d0c053e9a449d66b085bf00\""},
  "07/04":{"manifestSha":"b8cba771c136aabb5f04c79cd78a501dc849d1bef8397e0710c3faf2fa003de1","manifestBytes":1576,"mediaSha":"7da1e275c68a58df862930893d104fb8b22be3681cc4980ca3c082cee05574e1","mediaBytes":13304790,"vttSha":"6011bce5b3756bbfc56d164280914bbf93de70283c0363b0dcbc308dc84f615d","transcriptSha":"1c5ea63321892068b4948787446c92d955360e51192a7188f389e4a778ca0d94","mediaETag":"\"663374f592a13c0afed3a2fe7fac0da1\""},
  "07/05":{"manifestSha":"52019c20d230330df98a8285194deb92399b4964312f843d3b57cba650287ac1","manifestBytes":1538,"mediaSha":"458db030615b51d73516eb66246c6141032dc9e51a4941810a6ce7f026a28984","mediaBytes":11227643,"vttSha":"e4948f21b2168959367dec68d3436bcbbf77029f62fea3bb5460907b3e5a8de6","transcriptSha":"7f02f242d80ab7c32db2f75997b898064d25ea381b4faead4761bbf0e97f6ba9","mediaETag":"\"51c64bf8d608d9d34572dcdec7dcec60\""},
  "07/07":{"manifestSha":"39611fecb71875d06bbcf973e81cf9645ddeab5e2815d5c202b380e8779d387b","manifestBytes":2021,"mediaSha":"66621454467bbb3a2d83b9d510072e1f36cdea550e660199145606bdbf3555f5","mediaBytes":18318411,"vttSha":"4ee86209d6c15b20f2029ff5473899e9731e716ccb9ccfeb6b7c36d641175db9","transcriptSha":"5458c565dde77db31e727f5b81222209a88646b598028e07b5b5b62fc525af80","mediaETag":"\"4d3b07fa5a4de9265efe05157762d7e1\""},
  "07/08":{"manifestSha":"90674175fe3239614b386ef24af7413d4b891b17b8a1cc3f3daf1fb332eb2686","manifestBytes":1221,"mediaSha":"040c739f1b93ff3d1c0be3428e8f14740fa7cbd8d218e4f2dc7072dab436cc5e","mediaBytes":9849779,"vttSha":"be378e12f5b58cb08e6a10060e4b7d191200b70124c0d97ee5cbe70b82651a73","transcriptSha":"7ea11670f07fee4774713c0dd8e90bb641d54ce8146bfc0eeb4553d602f07f63","mediaETag":"\"64d1d87011e0444b5901211edcea9ef5\""},
  "07/09":{"manifestSha":"7cbf4c5207ef373fce3c11f0a3c4e09262320ec99ab5cf60ed911a4a95ee6f69","manifestBytes":1496,"mediaSha":"5a6ed60db6d381a63bb397fcf01e21d45211c84e56fdeea0023837f5f1db1067","mediaBytes":16824508,"vttSha":"3fcbbab009c9948167d05b36be1b3ef7ebf24e516747a6f849ecc78b51dafabc","transcriptSha":"2a1161f680897e709195a20069a25f5b7fc4a630d2d41804f1d6a2b59cb1e015","mediaETag":"\"d2e79f6db6b6c11985bde5445432f9b0\""},
  "07/10":{"manifestSha":"d93fcaa90fc95948726424f2765e567a63dc523f2a9b5a182482cbe21fe1c95c","manifestBytes":1629,"mediaSha":"3cd03f97738e86fa6e51ff80fc59aadbda37d7e4a34b20f71a8cbd675094c228","mediaBytes":14481596,"vttSha":"8f1cb7a466d1ec9cd7e7d6d2f141604c13bfaa8940f317857aee5ba75820a513","transcriptSha":"6c73e790daec6d234c6c4c13d0630c9fc80ef44bfe3e8a924a35da96da4dd259","mediaETag":"\"4dd97192eb7a1e257301ca98b18fb272\""},
  "07/11":{"manifestSha":"47fa3d23808dc282baaf8dfe6204a4a558ed9c7af25e89566f6cdc85bb5e23af","manifestBytes":1176,"mediaSha":"86d67a4f79e5ac53a9ff4611221344f79d0520b9e9d712e7bdb0ad8518993788","mediaBytes":11194141,"vttSha":"4710e93febb6340f9acfc8d033bc0d2b69144ac1e093a80025dd913ddd07ee8b","transcriptSha":"dacf541960b790dca70264ab81bb0f3293acd544901d8f67efab67f0a80dad0c","mediaETag":"\"60555bc4a6682c5b59ecedd9457eb3be\""},
  "08/01":{"manifestSha":"3a4902d4319f5af6e6d34e2240fb708bfd19fcfaf6583793635180fb2cda7fbe","manifestBytes":1614,"mediaSha":"6673953db71bae278bb7a97d858a454570863a9969050c36913da1e380a6ee4f","mediaBytes":11158226,"vttSha":"59b7bfcef54b325f2b538ffadbf4e2278359e24a9dbb5ffb05e2f87c60d8597f","transcriptSha":"3e14d03495c1c0f38f1bda5f8ad7e70ddf4214a1f943fcc7429045119c905739","posterUrl":"/course-visuals/sap-c03/module-08/slide-01-aip-v1.webp?v=sap-m08-aip-batch3","mediaETag":"\"07501d013835784ecce0a1da9513317e\""},
  "08/02":{"manifestSha":"9b4f6e23466028a3745c6e8e5f36359808f45ea94aba1d94052233773ee96027","manifestBytes":1601,"mediaSha":"187a42855302f1104a1f0812eec9270a173afec46af2ca3605b31f725184400d","mediaBytes":12588262,"vttSha":"377148814f48cd97f09c4fa0349754f85d92316c8f970bbd996c3e6091df81a4","transcriptSha":"b2887b9ea7729c2e48b42043046a146a4f2f71c8e2c6b3cbe6b7047c59e8f8dc","mediaETag":"\"ac27cb448face5db3d9ee9716fa658a8\""},
  "08/03":{"manifestSha":"5d45d7b4afa98a4cf4089d2e87a5d47ed3cee1ba4f07e76da93a669618312c62","manifestBytes":1600,"mediaSha":"49ffdc713a35196f0998ee4cd2f087543c5213c47b97cc70717af4280679663c","mediaBytes":13126938,"vttSha":"f2dd6ed45b4f79e85b66a350b79069d2b111d45b3a548ca245469666c0e9d68d","transcriptSha":"4cb2e1d9713d5a0f2d6eefc20b9fcb00ec2c7cdfad58e0fc0b7d1ade9a295107","mediaETag":"\"e3313f2e74e2c17da2f413995aa1ac78\""},
  "08/04":{"manifestSha":"ea41fad2831867c3c56548feeeb4eb6804517a6646bcdfd4b8c20e6c07e1b001","manifestBytes":1625,"mediaSha":"b9d6b50ccc6c980b7724648a28ff896689bb634002d000e5a0d24c03ab1a9d83","mediaBytes":11771147,"vttSha":"4c3bc43fa833001003bcfa436881603aeed2d6aa84aa8117e0cde28c22c6f9a4","transcriptSha":"852bf1799decf485c7d2e65f0ebff8f84485a95fb25c5359966a2ce05c141542","mediaETag":"\"7139a030e4a000676802dc257a54ac4c\""},
  "08/05":{"manifestSha":"8cd3988995159f8c2898a49624e83d6fe323abaad213bb73db569c8942f10488","manifestBytes":1601,"mediaSha":"3bc9cee97609e15070754065b5ece609dc0c19507d29f389b5e5e975923b5793","mediaBytes":11541046,"vttSha":"a2ac05f8c0682664393d05d7c2bb63c0e1fb3cf2034d1e39e08a3e16edf52ed0","transcriptSha":"08013f0d8c9bcd2c3492332c817e8928b251684a1088eba4034086efe488f480","mediaETag":"\"5ae7f78e0e9ebbba90b559e9d9ae70f8\""},
  "08/06":{"manifestSha":"c2cc371d268140ec3606b328f3f10783344a2fb0e077397d76a5b89ef9bbdc2d","manifestBytes":1610,"mediaSha":"df1ada90c68bb761a6c00f424b81ddcac8f6079376175508aee86bc9ab8ff445","mediaBytes":19313943,"vttSha":"d7b696348883612087d4838dfbb9a081f816257a2caf5a3ef5e8b6732b8f16cd","transcriptSha":"6a0d07958b91d86fa379aa4bbc501b46aba397c7d3e243a5966bac0be55e0fc2","mediaETag":"\"d8cad3655b10542f6945fd2c2b22f2f9\""},
  "08/07":{"manifestSha":"c9e7e57e76d982e051c92385962c50fcca80fe76b5e73f05f899ee6b4d5a3803","manifestBytes":1550,"mediaSha":"e501413bdc9d5397771d9d50d9573ea006c65ff74335f553a7e5a468b3657e78","mediaBytes":3128863,"vttSha":"c48fbbcca7b952212ff72592958fcab5724eaf5212fc5288570ff3ff7030a0bc","transcriptSha":"3c4569463e1378fc5a64f7ff942efd2c3794235f299edbdba072634473ec95ad","mediaETag":"\"c02baf2f2e9cd09df903e34a7d3a0c56\""},
  "08/08":{"manifestSha":"8582eefbc40bcf511ff2ca9411baa28da3cb27d9d4a2e944cea326b6ac826182","manifestBytes":1601,"mediaSha":"69e3b173f38aeb05043b147556e2b2dd2c0a059ce2bd93a1064f795c0a575bd0","mediaBytes":3376200,"vttSha":"557798ce1354f90ef9ca180db81b9d879fb45cfc48608c0bb3a480606db8ecdf","transcriptSha":"a53338c43ebc75373f099f263bfdc90e668d9ca4cb92b9d331c82dde686407e8","mediaETag":"\"8714c4c29b40cf6a58f8fe696d1d4ddc\""},
};
const M00_M08_SCOPE=new Set([
  "00/01",
  "01/01","01/02","01/03","01/07","01/11","01/12","01/13",
  "02/03","02/05","02/06","02/07","02/08",
  "03/01","03/02","03/03","03/07","03/09","03/10","03/11",
  "04/01","04/03","04/04","04/06","04/14",
  "05/02","05/08",
  "06/03","06/05","06/06","06/08",
  "07/01","07/02","07/03","07/04","07/05","07/07","07/08","07/09","07/10","07/11",
  "08/01","08/02","08/03","08/04","08/05","08/06","08/07","08/08",
]);

export function scopedDirectSapPart(moduleId:string,part:string):boolean{
 return M00_M08_SCOPE.has(moduleId+"/"+part);
}
export function directSapPin(moduleId:string,part:string):DirectSapPin|undefined{
 return scopedDirectSapPart(moduleId,part)?DIRECT_SAP_PINS[moduleId+"/"+part]:undefined;
}
export function sapDirectPrefix(moduleId:string,part:string):string{
 return `${SAP_MEDIA_ROOT}/module-${moduleId}/part-${part}/sap-module-${moduleId}-part-${part}`;
}
export function directSapCacheTag(sha:string):string{
 return `?v=${DIRECT_SAP_REVISION}&sha=${sha}`;
}
export function exactSapVideoRelease(moduleId:string,part:string):ExactRelease|undefined{
  return EXACT_RELEASES[moduleId+"/"+part];
}

export function sapVideoReleasePrefix(moduleId:string,part:string,release:string){
  return `${SAP_MEDIA_ROOT}/module-${moduleId}/releases/${release}/part-${part}/sap-module-${moduleId}-part-${part}`;
}

export function isExactSapCaptionSource(source:URL):boolean{
  if(source.origin!==COURSE_MEDIA_ORIGIN||source.username||source.password||source.hash)return false;
  const exactDirect=Object.entries(DIRECT_SAP_PINS).some(([key,pin])=>{
    const [moduleId,part]=key.split("/");
    return scopedDirectSapPart(moduleId,part)&&source.href===
     `${sapDirectPrefix(moduleId,part)}.vtt${directSapCacheTag(pin.vttSha)}`;
  });
  const fresh=Object.entries(PINNED_RELEASES).some(([key,value])=>{
    const [moduleId,part]=key.split("/");
    return source.href===`${sapVideoReleasePrefix(moduleId,part,value.revision)}.vtt${pinnedSapCacheTag(value.revision,value.pin.vttSha)}`;
  });
  const awaited=Object.entries(DEFERRED_RELEASES).some(([key,entry])=>{
    const [moduleId,part]=key.split("/");
    return source.href===`${sapVideoReleasePrefix(moduleId,part,entry.revision)}.vtt${deferredSapCaptionTag(entry)}`;
  });
  return exactDirect||fresh||awaited||Object.entries(EXACT_RELEASES).some(([key,value])=>{
    const [moduleId,part]=key.split("/");
    const prefix=sapVideoReleasePrefix(moduleId,part,value.release);
    return source.href===`${prefix}.vtt?v=${encodeURIComponent(value.revision)}`;
  });
}

type PinnedRelease={revision:string;pin:DirectSapPin};
const PINNED_RELEASES:Readonly<Record<string,PinnedRelease>>=published;
const LEGACY_VIDEO_MODULES=["00","01","02","03","04","05","06","07","08","09","10","15"];
export function pinnedSapVideoRelease(moduleId:string,part:string):PinnedRelease|undefined{
  if(!/^\d{2}$/.test(moduleId)||!/^\d{2}$/.test(part))return undefined;
  return PINNED_RELEASES[moduleId+"/"+part];
}
export function pinnedSapCacheTag(revision:string,sha:string){
  return `?v=${encodeURIComponent(revision)}&sha=${sha}`;
}
// This dedicated revision is reserved for the native rebuilds, not the 720p review copies.
export const M10_NATIVE_REVISION="2026-11-27-sap-m10-aip-native-v1";
export type DeferredSapRelease={
 revision:string; start:number; end:number;
 known?:Pick<DirectSapPin,"manifestSha"|"manifestBytes"|"mediaSha"|"mediaBytes"|"vttSha"|"transcriptSha">;
 vttBytes?:number; transcriptBytes?:number;
};
const M10_BOUNDS=[[1,3],[4,6],[7,8],[9,9],[10,10],[11,13],[14,16],[17,20],[21,23],
 [24,25],[26,28],[29,30],[31,32],[33,34],[35,36],[37,38],[39,40],[41,44],[45,45]];
const DEFERRED_RELEASES:Readonly<Record<string,DeferredSapRelease>>={
 ...Object.fromEntries(M10_BOUNDS.map(([start,end],index)=>[
   `10/${String(index+1).padStart(2,"0")}`,{revision:M10_NATIVE_REVISION,start,end}
 ])),
  "15/06":{"revision":"2026-11-27-sap-m15-p06-arrow-fix-v2","start":17,"end":19,"known":{"manifestSha":"4add65d67b783041d86a9a5d5d54a535af9096b38142bccc228cc8e7db14b9fe","manifestBytes":791,"mediaSha":"35d37e3d106e2fc68ed2baea4ec84964ad939e40cf5653ba18ab6215500af359","mediaBytes":13223988,"vttSha":"4472be7a4a0c68448019ddc6c41a8e6445b96462382a771f0b2148984616c534","transcriptSha":"460a7a5c2efb5122070acfafd93d9de913d37d154619a19607d507a5fea3fcc8"},"vttBytes":4846,"transcriptBytes":3214},
  "21/10":{"revision":"2026-11-27-sap-m21-p10-rollout-fix-v2","start":25,"end":27,"known":{"manifestSha":"5cc264a8ed069c336a1ad83aee459abafeca1513b189c1c4b522bbf8d2fa129d","manifestBytes":805,"mediaSha":"189ecb30f2f536745509d001ea06abed8ed752d2fdcda3d4bf5b12aca0114a97","mediaBytes":11646418,"vttSha":"dbaaf681d12dbe43d179c2f5e5b3722c9669fb33905cfd281ced3abfa4abaf67","transcriptSha":"7fa1b5801518481fd6ac7ed3a8e3dd30a048538e892565a376eb2342612f2558"},"vttBytes":4725,"transcriptBytes":3268},
};
export function deferredSapVideoRelease(moduleId:string,part:string):DeferredSapRelease|undefined{
 return DEFERRED_RELEASES[moduleId+"/"+part];
}
export function deferredSapCaptionTag(entry:DeferredSapRelease){
 return entry.known?pinnedSapCacheTag(entry.revision,entry.known.vttSha):`?v=${encodeURIComponent(entry.revision)}`;
}
export function sapVideoProjection(moduleId:string){
  const modules=new Set(LEGACY_VIDEO_MODULES);
  const revisions:Record<string,string>={};
  for(const [slot,entry] of Object.entries({...DEFERRED_RELEASES,...PINNED_RELEASES})){
    const [module,part]=slot.split("/");
    modules.add(module);
    if(module===moduleId)revisions[part]=entry.revision;
  }
  return {hasVideos:modules.has(moduleId),only:!LEGACY_VIDEO_MODULES.includes(moduleId),parts:Object.keys(revisions).sort(),modules:[...modules].sort(),revisions};
}
