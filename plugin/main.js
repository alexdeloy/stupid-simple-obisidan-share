var obsidian = require("obsidian");

var DEFAULT_SETTINGS = {
    endpoint: "default"
};

class SimpleSharePlugin extends obsidian.Plugin {

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new SimpleShareSettingTab(this.app, this));
        this.addRibbonIcon("square-arrow-out-up-right", "Share note", () => {
            this.shareView();
        });
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    shareView() {
        var markdownView = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        var file = markdownView.file;
        var title = file.basename;
        var body = markdownView.data;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", this.settings.endpoint + "?title=" + title);
        xhr.onload = () => {
            if (xhr.readyState === xhr.DONE) {
              if (xhr.status === 200) {
                var shareUrl = xhr.responseText;
                navigator.clipboard.writeText(shareUrl).then(() => {
                    new obsidian.Notice("Copied sharing Link to clipboard:\n" + shareUrl);
                },() => {
                    new obsidian.Notice("Error: Could not copy sharing Link to clipboard:\n" + shareUrl);
                });
              }
            }
          };
          xhr.send(body);
    }
};

class SimpleShareSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();

        new obsidian.Setting(containerEl).setName("Endpoint URL").addText((text) => text.setPlaceholder("Enter your secret").setValue(this.plugin.settings.endpoint).onChange(async (value) => {
            this.plugin.settings.endpoint = value;
            await this.plugin.saveSettings();
        }));
    }
};

module.exports = SimpleSharePlugin;