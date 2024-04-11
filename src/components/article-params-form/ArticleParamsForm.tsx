import { SyntheticEvent, useRef, useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import {
	fontColors,
	contentWidthArr,
	backgroundColors,
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
} from '../../constants/articleProps';
import { Text } from '../text';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ChangeSettings = (newSettings: typeof defaultArticleState) => void;

export const ArticleParamsForm = ({
	changeSettings,
}: {
	changeSettings: ChangeSettings;
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false); //Состояние стрелки
	const [stateBtn, setBtn] = useState(0); //допстайт для закрытия вне поля
	const [stateFont, setStateFont] = useState(
		defaultArticleState.fontFamilyOption
	); //Шрифт
	const [stateFontSize, setstateFontSize] = useState(
		defaultArticleState.fontSizeOption
	); //размер Шрифта
	const [stateColorFont, setStateColorFont] = useState(
		defaultArticleState.fontColor
	); //цвет Шрифта
	const [stateBg, setStateBg] = useState(defaultArticleState.backgroundColor); //цвет фона
	const [stateWidthContent, setStateWidthContent] = useState(
		defaultArticleState.contentWidth
	); //Ширина контента
	const sideBar = useRef(null);

	const handleResetForm = () => {
		changeSettings(defaultArticleState);
		setStateFont(defaultArticleState.fontFamilyOption);
		setstateFontSize(defaultArticleState.fontSizeOption);
		setStateColorFont(defaultArticleState.fontColor);
		setStateBg(defaultArticleState.backgroundColor);
		setStateWidthContent(defaultArticleState.contentWidth);
	};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();

		changeSettings({
			fontFamilyOption: stateFont,
			fontColor: stateColorFont,
			backgroundColor: stateBg,
			contentWidth: stateWidthContent,
			fontSizeOption: stateFontSize,
		});
	};

	function handleClickForm(event: SyntheticEvent) {
		event.stopPropagation();
	}

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: sideBar,
		onClose: () => {
			setBtn(stateBtn + 1);
		},
		onChange: () => {
			if (stateBtn === 1) {
				setIsMenuOpen(false);
				setBtn(0);
			}
		},
	});

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				click={() => {
					setIsMenuOpen(!isMenuOpen);
				}}
			/>
			<aside
				ref={sideBar}
				className={`${styles.container} ${
					isMenuOpen && styles.container_open
				}`}>
				<form
					className={styles.form}
					onClick={handleClickForm}
					onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={stateFont}
						options={fontFamilyOptions}
						onChange={(selected) => setStateFont(selected)}
					/>
					<RadioGroup
						title='размер шрифта'
						name='Кто Я, зачем я тут ?'
						selected={stateFontSize}
						options={fontSizeOptions}
						onChange={(selected) => setstateFontSize(selected)}
					/>
					<Select
						title='цвет шрифта'
						selected={stateColorFont}
						options={fontColors}
						onChange={(selected) => setStateColorFont(selected)}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={stateBg}
						options={backgroundColors}
						onChange={(selected) => setStateBg(selected)}
					/>
					<Select
						title='ширина контента'
						selected={stateWidthContent}
						options={contentWidthArr}
						onChange={(selected) => setStateWidthContent(selected)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
