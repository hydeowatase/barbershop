import IMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";
import IParseMailTemplateDTO from "@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO";

class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse(): Promise<string> {
        return "Mail Content";
    }
}

export default FakeMailTemplateProvider;