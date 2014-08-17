module CustomLiquidFilters
  def to_url(input)
    input.to_url
  end
end

Liquid::Template.register_filter CustomLiquidFilters