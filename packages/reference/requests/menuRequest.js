// Config
import { MenuUrl } from '../constants/apiUrls'
import * as types from '../actions/actionTypes'

export const menuRequest = {
  endpoint: MenuUrl,
  query: {
    fields: {
      menu_items: 'title,slug,menu_items,item,background_image_link,background_image,published,canonical_path,meta_attributes',
      menus: 'title,reference,updated_at,menu_items'
    },
    filter: {
      filter: {
        reference: {
          eq: 'mega-menu'
        }
      }
    },
    include: 'menu_items'
  },
  successActionType: types.SET_MENU
}
