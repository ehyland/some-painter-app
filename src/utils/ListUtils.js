export default {

  listAddOrReplaceByID (list, item) {
    const index = list.findIndex(testItem => testItem.ID === item.ID);
    if (index === -1) {

      // Add item
      return list.push(item);
    }else {

      // Replace item
      return list.splice(index, 1, item);
    }
  }

};
