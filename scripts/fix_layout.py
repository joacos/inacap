with open("src/components/ZonaClientPage.tsx", "r") as f:
    content = f.read()

# Replace root div classes
content = content.replace(
    'className="flex flex-col min-h-dvh pb-28 dot-grid"',
    'className="flex flex-col h-dvh overflow-hidden dot-grid"'
)

# Insert the top sticky wrapper around header, timeline and switch
content = content.replace(
    '{/* Header */}',
    '{/* --- FIXED TOP SECTION --- */}\n          <div className="flex-shrink-0 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/60 z-40 relative pt-1 pb-3">\n            {/* Header */}'
)

# Close the sticky wrapper after the switch toggle block (or Timeline block)
# Find the exact insertion point for closing the top section and opening the scrollable section.
search_str = """
            </div>
          )}

          {/* Content */}
          <motion.div
"""
replace_str = """
            </div>
          )}
          </div> {/* END FIXED TOP SECTION */}

          {/* --- SCROLLABLE CONTENT SECTION --- */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative pb-32">
          {/* Content */}
          <motion.div
"""
content = content.replace(search_str, replace_str)

# Close the scrollable section before InteractionGuide
search_str2 = """          {/* Onboarding Interactive Guide Overlay */}
          <AnimatePresence>
"""
replace_str2 = """          </div> {/* END SCROLLABLE CONTENT SECTION */}

          {/* Onboarding Interactive Guide Overlay */}
          <AnimatePresence>
"""
content = content.replace(search_str2, replace_str2)

with open("src/components/ZonaClientPage.tsx", "w") as f:
    f.write(content)
