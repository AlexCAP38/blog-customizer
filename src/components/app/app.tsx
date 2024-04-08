import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [defaultState, setDefaultState] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': defaultState.fontFamilyOption.value,
					'--font-size': defaultState.fontSizeOption.value,
					'--font-color': defaultState.fontColor.value,
					'--container-width': defaultState.contentWidth.value,
					'--bg-color': defaultState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm changeSettings={setDefaultState} />
			<Article />
		</main>
	);
};
