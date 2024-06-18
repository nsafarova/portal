import React, { useEffect } from "react";
import styles from "./index.module.css";
import ArrowDown from "@site/static/img/svgIcons/arrowDown.svg";
import ArrowUp from "@site/static/img/svgIcons/arrowUp.svg";
import Delete from "@site/static/img/svgIcons/delete.svg";
import Filter from "@site/static/img/svgIcons/filter.svg";
import Close from "@site/static/img/svgIcons/close.svg";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { CourseContentType } from "../../Common/courseItems";

const languageOptions = ["Motoko", "Rust", "TypeScript", "None"];
const contentLanguageOptions = ["English", "Spanish", "Turkish"];
const levelOptions = ["Beginner", "Intermediate", "Expert"];
const contentTypeOptions: CourseContentType[] = ["text", "video"];
const sortByOptions = ["Relevance", "A to Z", "Z to A"];

function Index({
  numberOfItems,
  selectedLanguages,
  setSelectedLanguages,
  selectedContentLanguages,
  setSelectedContentLanguages,
  selectedLevels,
  setSelectedLevels,
  selectedContentTypes,
  setSelectedContentTypes,
  selectedSortBy,
  setSelectedSortBy,
  searchTerm,
  setSearchTerm,
}) {
  const [currentSelection, setCurrentSelection] = React.useState(null);
  const [displayMobileFilters, setDisplayMobileFilters] = React.useState(false);
  const selectBoxesRef = React.useRef(null);
  const updateCurrentSelection = (selection) => {
    if (selection === currentSelection) {
      setCurrentSelection(null);
    } else setCurrentSelection(selection);
  };

  const clearFilters = () => {
    setSelectedLanguages([]);
    setSelectedContentLanguages([]);
    setSelectedLevels([]);
    setSelectedContentTypes([]);
    setSelectedSortBy("Relevance");
    setCurrentSelection(null);
    setSearchTerm("");
  };
  const updateSelectedContentLanguages = (contentLanguage) => {
    if (selectedContentLanguages.includes(contentLanguage)) {
      setSelectedContentLanguages(
        selectedContentLanguages.filter((item) => item !== contentLanguage)
      );
    } else {
      setSelectedContentLanguages([
        ...selectedContentLanguages,
        contentLanguage,
      ]);
    }
  };
  const updateSelectedLanguages = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((item) => item !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };
  const updateSelectedLevels = (level) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter((item) => item !== level));
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };
  const updateSelectedContentTypes = (contentType) => {
    if (selectedContentTypes.includes(contentType)) {
      setSelectedContentTypes(
        selectedContentTypes.filter((item) => item !== contentType)
      );
    } else {
      setSelectedContentTypes([...selectedContentTypes, contentType]);
    }
  };

  const updateSelectedSortBy = (contentType) => {
    setSelectedSortBy(contentType);
    setCurrentSelection(null);
  };
  const handleClick = (event) => {
    if (
      selectBoxesRef.current !== event.target &&
      !selectBoxesRef.current.contains(event.target)
    ) {
      setCurrentSelection(null);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div id="start" />
      <div className="container-10 !px-0">
        <div className={styles.filterBarHeader}>
          <h3 className={styles.title}>Courses and Content</h3>
          <span className={styles.numberOfItems}>{numberOfItems}</span>
          {(selectedLanguages.length > 0 ||
            selectedContentLanguages.length > 0 ||
            selectedLevels.length > 0 ||
            selectedContentTypes.length > 0 ||
            searchTerm.length > 0) && (
            <button
              onClick={() => clearFilters()}
              className={styles.clearFilters}
            >
              <p style={{ marginBottom: 0, marginRight: "6px" }}>
                Delete all filters
              </p>
              <Delete />
            </button>
          )}
        </div>
        <div
          className={styles.mobileFilterBarHeader}
          onClick={() => setDisplayMobileFilters(true)}
        >
          <div className={styles.filterIcon}>
            <Filter />
          </div>
          <span className={styles.title}>Courses and Content</span>
          <span className={styles.numberOfItems}>{numberOfItems}</span>
        </div>
        <div ref={selectBoxesRef} className={styles.selectBoxes}>
          <div className={styles.selectBoxContainer}>
            <button
              className={styles.selectBox}
              style={{
                color: selectedLanguages.length > 0 ? "#3B00B9" : "black",
              }}
              onClick={() => updateCurrentSelection("language")}
            >
              <p className={styles.selectTitle}>Language</p>
              <div className={styles.selectionArrow}>
                {currentSelection === "language" ? <ArrowUp /> : <ArrowDown />}
              </div>
            </button>
            {currentSelection === "language" && (
              <div className={styles.selectOptionsContainer}>
                <div className={styles.selectOptions}>
                  {languageOptions.map((language) => (
                    <label key={language} className={styles.selectOption}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        key={language}
                        value={language}
                        checked={selectedLanguages.includes(
                          language.toLowerCase()
                        )}
                        onChange={(e) =>
                          updateSelectedLanguages(e.target.value.toLowerCase())
                        }
                      />
                      {language}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.selectBoxContainer}>
            <button
              className={styles.selectBox}
              style={{ color: selectedLevels.length > 0 ? "#3B00B9" : "black" }}
              onClick={() => updateCurrentSelection("level")}
            >
              <p className={styles.selectTitle}>Level</p>
              <div className={styles.selectionArrow}>
                {currentSelection === "level" ? <ArrowUp /> : <ArrowDown />}
              </div>
            </button>
            {currentSelection === "level" && (
              <div className={styles.selectOptionsContainer}>
                <div className={styles.selectOptions}>
                  {levelOptions.map((level) => (
                    <label key={level} className={styles.selectOption}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        key={level}
                        value={level}
                        checked={selectedLevels.includes(level.toLowerCase())}
                        onChange={(e) =>
                          updateSelectedLevels(e.target.value.toLowerCase())
                        }
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.selectBoxContainer}>
            <button
              className={styles.selectBox}
              style={{
                color: selectedContentTypes.length > 0 ? "#3B00B9" : "black",
              }}
              onClick={() => updateCurrentSelection("contentType")}
            >
              <p className={styles.selectTitle}>Content Type</p>
              <div className={styles.selectionArrow}>
                {currentSelection === "contentType" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )}
              </div>
            </button>
            {currentSelection === "contentType" && (
              <div className={styles.selectOptionsContainer}>
                <div className={styles.selectOptions}>
                  {contentTypeOptions.map((contentType) => (
                    <label key={contentType} className={styles.selectOption}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        key={contentType}
                        value={contentType}
                        checked={selectedContentTypes.includes(
                          contentType.toLowerCase()
                        )}
                        onChange={(e) =>
                          updateSelectedContentTypes(
                            e.target.value.toLowerCase()
                          )
                        }
                      />
                      {contentType}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.selectBoxContainer}>
            <button
              className={styles.selectBox}
              style={{
                color:
                  selectedContentLanguages.length > 0 ? "#3B00B9" : "black",
              }}
              onClick={() => updateCurrentSelection("contentLanguage")}
            >
              <p className={styles.selectTitle}>Content Language</p>
              <div className={styles.selectionArrow}>
                {currentSelection === "contentLanguage" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )}
              </div>
            </button>
            {currentSelection === "contentLanguage" && (
              <div className={styles.selectOptionsContainer}>
                <div className={styles.selectOptions}>
                  {contentLanguageOptions.map((contentLanguage) => (
                    <label
                      key={contentLanguage}
                      className={styles.selectOption}
                    >
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        key={contentLanguage}
                        value={contentLanguage}
                        checked={selectedContentLanguages.includes(
                          contentLanguage.toLowerCase()
                        )}
                        onChange={(e) =>
                          updateSelectedContentLanguages(
                            e.target.value.toLowerCase()
                          )
                        }
                      />
                      {contentLanguage}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.selectBoxContainer}>
            <input
              type="text"
              placeholder="Search in courses"
              className={clsx(styles.inputBox)}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            ></input>
          </div>
        </div>
        {/*<div className={styles.sortByContainer}>
          <div
            className={styles.sortBy}
            onClick={() => updateCurrentSelection("sortBy")}
          >
            <p>Sort By</p>
            <div className={styles.selectionArrow}>
              {isSelectingSortBy ? <ArrowUp /> : <ArrowDown />}
            </div>
          </div>
          {isSelectingSortBy && (
            <div className={styles.sortByOptionsContainer}>
              <div className={styles.selectOptions}>
                {sortByOptions.map((sortOption) => (
                  <label key={sortOption} className={styles.selectOption}>
                    <input
                      type="checkbox"
                      key={sortOption}
                      value={sortOption}
                      checked={selectedSortBy.includes(sortOption)}
                      onChange={(e) => updateSelectedSortBy(e.target.value)}
                    />
                    {sortOption}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>*/}
      </div>
      <div className={styles.mobileFilterBarButtonContainer}>
        <div
          className={styles.mobileFilterBarButton}
          onClick={() => setDisplayMobileFilters(true)}
        >
          <div className={styles.filterIcon}>
            <Filter />
          </div>
          <span className={styles.title}>Courses</span>
          <span className={styles.numberOfItems}>{numberOfItems}</span>
        </div>
      </div>
      <AnimatePresence exitBeforeEnter initial={false}>
        {displayMobileFilters && (
          <motion.div
            key="mobileFilterBar"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2, ease: "linear" }}
            className={clsx(styles.mobileFilterBar)}
          >
            <div className={styles.mobileFilterContainer}>
              <div
                onClick={() => setDisplayMobileFilters(false)}
                className={styles.closeIcon}
              >
                <Close />
              </div>
              <p className={styles.mobileFilterTitle}>Courses</p>
              <div className={styles.mobileSelectContainer}>
                <p>Language</p>
                <div className={styles.mobileFilterOptions}>
                  {languageOptions.map((language) => (
                    <label key={language} className={styles.selectOption}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        key={language}
                        value={language}
                        checked={selectedLanguages.includes(
                          language.toLowerCase()
                        )}
                        onChange={(e) =>
                          updateSelectedLanguages(e.target.value.toLowerCase())
                        }
                      />
                      {language}
                    </label>
                  ))}
                </div>

                <p>Level</p>
                <div className={styles.mobileFilterOptions}>
                  {levelOptions.map((level) => (
                    <label key={level} className={styles.selectOption}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        key={level}
                        value={level}
                        checked={selectedLevels.includes(level.toLowerCase())}
                        onChange={(e) =>
                          updateSelectedLevels(e.target.value.toLowerCase())
                        }
                      />
                      {level}
                    </label>
                  ))}
                </div>
                <p>Content Type</p>

                <div className={styles.mobileFilterOptions}>
                  {contentTypeOptions.map((contentType) => (
                    <label key={contentType} className={styles.selectOption}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        key={contentType}
                        value={contentType}
                        checked={selectedContentTypes.includes(
                          contentType.toLowerCase()
                        )}
                        onChange={(e) =>
                          updateSelectedContentTypes(
                            e.target.value.toLowerCase()
                          )
                        }
                      />
                      {contentType}
                    </label>
                  ))}
                </div>
                <p>Content Language</p>

                <div className={styles.mobileFilterOptions}>
                  {contentLanguageOptions.map((contentLanguage) => (
                    <label
                      key={contentLanguage}
                      className={styles.selectOption}
                    >
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        key={contentLanguage}
                        value={contentLanguage}
                        checked={selectedContentLanguages.includes(
                          contentLanguage.toLowerCase()
                        )}
                        onChange={(e) =>
                          updateSelectedContentLanguages(
                            e.target.value.toLowerCase()
                          )
                        }
                      />
                      {contentLanguage}
                    </label>
                  ))}
                </div>
                <p>Search Courses</p>
                <div className={styles.mobileFilterOptions}>
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className={clsx(styles.inputBox)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                  ></input>
                </div>
                <Link
                  to={"#start"}
                  className={styles.mobileFilterButton}
                  onClick={() => setDisplayMobileFilters(false)}
                >
                  <span>Apply Filters</span>
                </Link>
                <Link
                  to={"#start"}
                  className={styles.mobileFilterClearButton}
                  onClick={() => {
                    clearFilters();
                    setDisplayMobileFilters(false);
                  }}
                >
                  <span>Clear Filters</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Index;
