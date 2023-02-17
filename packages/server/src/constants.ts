export const GPP_CREATE_FULFILLMENT_ORDER_EMAIL = 'noreply@jumbo.com';

/**
 * The hardcoded (Jumbo x Gorillas) product map for the top 10 products.
 * A "V" in front of the name denotes a match with a product in our database.
 * A "X" in front of the name denotes a non-match with a product in our database.
 */
export const TEMPORARILY_HARDCODED_PRODUCT_MAP = {
  // V: Jumbo Komkommer
  // https://www.jumbo.com/producten/jumbo-komkommer-302238STK
  '302238STK': '211225289',
  // V: Dole Bio Bananen 850g
  // https://www.jumbo.com/producten/dole-bio-bananen-850g-226925ZK
  '226925ZK': '211225285',
  // V: SPA REINE Natuurlijk Mineraalwater 1L
  // https://www.jumbo.com/producten/spa-reine-natuurlijk-mineraalwater-1l-448284FLS
  '448284FLS': '211225290',
  // V: Spa Intense Mineraalwater Bruisend 1L
  // https://www.jumbo.com/producten/spa-intense-mineraalwater-bruisend-1l-428894FLS
  '428894FLS': '211225286',
  // X: Coca-Cola Original Taste 8 x 250ml
  // https://www.jumbo.com/producten/coca-cola-original-taste-8-x-250ml-363753PAK
  '363753PAK': '211225291',
  // X: Coca-Cola Zero Sugar 8 x 250ml
  // https://www.jumbo.com/producten/coca-cola-zero-sugar-8-x-250ml-363751PAK
  '363751PAK': '211225292',
  // X: Arla Biologisch Halfvolle Melk 0, 5L
  // https://www.jumbo.com/producten/arla-biologisch-halfvolle-melk-0,5l-48133STK
  '48133STK': '211225287',
  // V: Jumbo Verse Biologische Eieren S/M/L 10 Stuks
  // https://www.jumbo.com/producten/jumbo-verse-biologische-eieren-s~m~l-10-stuks-297019DS
  '297019DS': '211225283',
  // V: Jumbo Gember Shot Citroen / Appel 60ml
  // https://www.jumbo.com/producten/jumbo-gember-shot-citroen-~-appel-60ml-382904FLS
  '382904FLS': '211225284',
  // X: Dole Bananen 1kg
  // https://www.jumbo.com/producten/dole-bananen-1kg-207395ZK
  '207395ZK': '211225288',
  // This product is added for the sake of testing (on test env).
  // https://test.jumbo.com/producten/jumbo-fruitsiroop-multifruit-750ml-148619FLS
  // Maps to SPA Reine drink
  '148619FLS': '211225290',
};
