export default defineBackground(() => {
  browser.contextMenus.create({
    "id": "add-to-quick-list",
    "title": "Add to Quick List",
    contexts: ["selection"]
  })
  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === 'add-to-quick-list') {
      const selectedText = info.selectionText || ""; // The text that was selected
      console.log(`Adding to Quick List: ${selectedText}`);
      let quickList: string[] = await storage.getItem("local:quickList") || [];
      quickList.push(selectedText);
      await storage.setItem("local:quickList", quickList)
    }


    // Implement the logic to add the selected text to a Quick List
    // Optionally, send a message to a content script or popup to handle additional logic
    // browser.tabs.sendMessage(tab.id || 1, {
    //   action: 'addToQuickList',
    //   text: selectedText,
    // });

  });
});
