require ::File.expand_path('../model_adapter',  __FILE__)

# require the name providers
require ::File.expand_path('../name_providers/catalogue_of_life',  __FILE__)
require ::File.expand_path('../name_providers/ubio',  __FILE__)
require ::File.expand_path('../name_providers/nzor',  __FILE__)
require ::File.expand_path('../name_providers/eol',  __FILE__)
require ::File.expand_path('../name_providers/bug_guide',  __FILE__)

class TaxonNameAdapterError < StandardError; end
class TaxonAdapterError < StandardError; end
class NameProviderError < StandardError; end
